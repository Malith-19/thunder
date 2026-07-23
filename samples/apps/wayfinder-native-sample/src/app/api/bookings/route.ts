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

import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { addBooking, getBookings, getFlight } from "@/lib/mock-data";

/** A user's bookings. Protected: requires a valid BFF session. */
export async function GET() {
  const session = await getSession();
  const userKey = session.user?.sub;
  if (!session.accessToken || !userKey) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ data: getBookings(userKey) });
}

/** Create a booking for the signed-in user. */
export async function POST(request: Request) {
  const session = await getSession();
  const userKey = session.user?.sub;
  if (!session.accessToken || !userKey) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { flightId?: string; travelers?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const flight = body.flightId ? getFlight(body.flightId) : undefined;
  if (!flight) {
    return NextResponse.json({ error: "Unknown flight" }, { status: 404 });
  }

  const travelers = Math.max(1, Number(body.travelers) || 1);
  const booking = addBooking(userKey, flight, travelers);
  return NextResponse.json({ data: booking }, { status: 201 });
}
