/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface SessionUser {
  sub?: string;
  username?: string;
  displayName?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
}

function displayName(user: SessionUser): string {
  if (user.displayName) return user.displayName;
  const full = [user.given_name, user.family_name].filter(Boolean).join(" ");
  return full || user.username || user.sub || "Traveler";
}

export function Header() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active) setUser(data?.user ?? null);
      })
      .catch(() => {
        if (active) setUser(null);
      });
    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand">
          <span aria-hidden="true">✈️</span> Wayfinder Native
        </Link>
        <nav className="header-nav" aria-label="Primary">
          <Link href="/">Flights</Link>
          {user && <Link href="/bookings">My Bookings</Link>}
        </nav>
        <div className="auth-cluster" ref={menuRef}>
          {user ? (
            <>
              <button
                type="button"
                className="user-chip"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span aria-hidden="true">👤</span>
                {displayName(user)}
              </button>
              {menuOpen && (
                <div className="account-menu" role="menu">
                  <Link href="/bookings" role="menuitem" onClick={() => setMenuOpen(false)}>
                    My Bookings
                  </Link>
                  <Link href="/profile" role="menuitem" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <button type="button" role="menuitem" onClick={signOut}>
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/signin" className="btn btn-primary btn-small">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
