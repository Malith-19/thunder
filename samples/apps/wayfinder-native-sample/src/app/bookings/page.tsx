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

import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getBookings } from "@/lib/mock-data";

export default async function BookingsPage() {
  const session = await getSession();
  if (!session.accessToken || !session.user?.sub) {
    redirect("/signin");
  }

  const bookings = getBookings(session.user!.sub!);

  return (
    <div>
      <h1 className="section-title" style={{ marginTop: 0 }}>
        My Bookings
      </h1>
      {bookings.length === 0 ? (
        <div className="panel">
          <p className="muted">You have no bookings yet.</p>
          <Link href="/" className="btn btn-primary btn-small">
            Search flights
          </Link>
        </div>
      ) : (
        <div className="flight-grid">
          {bookings.map((booking) => (
            <div className="flight-card" key={booking.id}>
              <span className="flight-route">
                {booking.from} → {booking.to}
              </span>
              <span className="flight-meta">
                {booking.airline} · departs {booking.departure}
              </span>
              <span className="flight-meta">
                {booking.travelers} traveler{booking.travelers > 1 ? "s" : ""} · ref {booking.id}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
