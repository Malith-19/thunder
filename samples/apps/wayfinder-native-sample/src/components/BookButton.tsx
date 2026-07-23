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

import { useRouter } from "next/navigation";
import { useState } from "react";

export function BookButton({ flightId }: { flightId: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "booking" | "booked">("idle");

  async function book() {
    setState("booking");
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flightId, travelers: 1 }),
    });
    if (res.status === 401) {
      router.push("/signin");
      return;
    }
    if (res.ok) {
      setState("booked");
      router.refresh();
      return;
    }
    setState("idle");
  }

  return (
    <button
      type="button"
      className="btn btn-primary btn-small"
      disabled={state !== "idle"}
      onClick={book}
    >
      {state === "booked" ? "Booked ✓" : state === "booking" ? "Booking…" : "Book"}
    </button>
  );
}
