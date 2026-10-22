#!/usr/bin/env bash
# Copyright 2026 The ThunderID Authors
# SPDX-License-Identifier: Apache-2.0
#
# Exercises the project proxy against the demo projects of bootstrap/90-project-proxy.yaml. Expects
# ThunderID, the development issuer and the proxy to be running. Requires curl and jq.

set -uo pipefail

ISSUER="${ISSUER:-http://localhost:8096}"
PROXY="${PROXY:-http://localhost:8097}"
SHOP=project-shop
BANK=project-bank
SUFFIX="$(date +%s)"
FAILED=0

token() { curl -sf "$ISSUER/token?sub=$1&projects=$2" | jq -r .access_token; }
ALICE="$(token alice "$SHOP")"
BOB="$(token bob "$BANK")"

# call <token> <project> <method> <path> [body]: prints the response body, then the status on the last line.
call() {
  local args=(-s -w '\n%{http_code}' -X "$3" -H "Authorization: Bearer $1")
  [[ -n "$2" ]] && args+=(-H "X-Project-Id: $2")
  [[ $# -ge 5 ]] && args+=(-H "Content-Type: application/json" -d "$5")
  curl "${args[@]}" "$PROXY$4"
}
status() { tail -n1 <<<"$1"; }
body() { sed '$d' <<<"$1"; }

check() {
  if [[ "$2" == "$3" ]]; then
    echo "PASS  $1"
  else
    echo "FAIL  $1 (got $2, want $3)"
    FAILED=1
  fi
}

R=$(call "$ALICE" $SHOP POST /users \
  "{\"type\":\"shop-person\",\"attributes\":{\"username\":\"ann-$SUFFIX\",\"email\":\"ann-$SUFFIX@shop.test\"}}")
check "alice creates a user in shop without ouId" "$(status "$R")" 201
check "  the user lands in shop's root organization unit" "$(body "$R" | jq -r .ouId)" $SHOP

R=$(call "$BOB" $BANK POST /users \
  "{\"type\":\"bank-person\",\"attributes\":{\"username\":\"bill-$SUFFIX\",\"email\":\"bill-$SUFFIX@bank.test\"}}")
check "bob creates a user in bank" "$(status "$R")" 201
BANK_USER=$(body "$R" | jq -r .id)

R=$(call "$ALICE" $SHOP GET /users)
check "alice lists only shop's users" \
  "$(body "$R" | jq -r '[.users[].ouId] | unique | join(",")')" $SHOP

R=$(call "$ALICE" $SHOP GET /organization-units)
check "alice sees only shop's root organization unit" \
  "$(body "$R" | jq -r '[.organizationUnits[].id] | join(",")')" $SHOP

R=$(call "$ALICE" $SHOP GET "/users/$BANK_USER")
check "alice cannot read bank's user from shop" "$(status "$R")" 403

R=$(call "$ALICE" $SHOP POST /users \
  "{\"type\":\"shop-person\",\"ouId\":\"$BANK\",\"attributes\":{\"username\":\"x-$SUFFIX\",\"email\":\"x-$SUFFIX@x.test\"}}")
check "alice cannot create a user in bank's organization unit" "$(status "$R")" 403

R=$(call "$ALICE" $SHOP DELETE "/organization-units/$BANK")
check "alice cannot delete bank's root organization unit" "$(status "$R")" 403

R=$(call "$ALICE" $BANK GET /users)
check "alice cannot use bank, which her token does not list" "$(status "$R")" 404

R=$(call "$ALICE" "" GET /users)
check "a request that names no project is refused" "$(status "$R")" 400

R=$(call "$ALICE" $SHOP GET /flows)
check "an API the proxy does not serve is refused" "$(status "$R")" 404

R=$(call "$ALICE" $SHOP POST /organization-units "{\"handle\":\"eng-$SUFFIX\",\"name\":\"Engineering $SUFFIX\"}")
check "alice creates a child organization unit in shop" "$(status "$R")" 201
CHILD=$(body "$R" | jq -r .id)
check "  its parent is shop's root" "$(body "$R" | jq -r .parent)" $SHOP

R=$(call "$ALICE" $SHOP GET "/organization-units/$CHILD")
check "KNOWN GAP: alice cannot manage the child organization unit" "$(status "$R")" 403

exit $FAILED
