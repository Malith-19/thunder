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

/**
 * In-memory travel data. This sample is about authentication, not persistence,
 * so flights are static and bookings live in a per-process map keyed by user.
 * Booking APIs are protected by the BFF session.
 */

export interface Flight {
  id: string;
  from: string;
  to: string;
  airline: string;
  departure: string;
  duration: string;
  price: number;
}

export interface Booking {
  id: string;
  flightId: string;
  from: string;
  to: string;
  airline: string;
  departure: string;
  travelers: number;
  createdAt: string;
}

export const FLIGHTS: Flight[] = [
  { id: "cmb-sin-01", from: "Colombo", to: "Singapore", airline: "SriLankan", departure: "08:15", duration: "3h 55m", price: 320 },
  { id: "cmb-sin-02", from: "Colombo", to: "Singapore", airline: "Scoot", departure: "21:40", duration: "4h 05m", price: 265 },
  { id: "sin-nrt-01", from: "Singapore", to: "Tokyo", airline: "ANA", departure: "09:00", duration: "7h 10m", price: 540 },
  { id: "lon-dxb-01", from: "London", to: "Dubai", airline: "Emirates", departure: "14:20", duration: "6h 50m", price: 480 },
  { id: "dxb-cmb-01", from: "Dubai", to: "Colombo", airline: "Emirates", departure: "03:10", duration: "4h 30m", price: 295 },
  { id: "nrt-sin-01", from: "Tokyo", to: "Singapore", airline: "Singapore Airlines", departure: "11:45", duration: "7h 20m", price: 560 },
];

export function listFlights(from?: string, to?: string): Flight[] {
  return FLIGHTS.filter((flight) => {
    const matchFrom = !from || flight.from.toLowerCase().includes(from.toLowerCase());
    const matchTo = !to || flight.to.toLowerCase().includes(to.toLowerCase());
    return matchFrom && matchTo;
  });
}

export function getFlight(id: string): Flight | undefined {
  return FLIGHTS.find((flight) => flight.id === id);
}

// Per-user bookings. A Map keyed by user subject. Resets when the dev server
// restarts, which is fine for a demo.
const bookingsByUser = new Map<string, Booking[]>();

export function getBookings(userKey: string): Booking[] {
  return bookingsByUser.get(userKey) ?? [];
}

export function addBooking(userKey: string, flight: Flight, travelers: number): Booking {
  const existing = bookingsByUser.get(userKey) ?? [];
  const booking: Booking = {
    id: `bk-${flight.id}-${existing.length + 1}`,
    flightId: flight.id,
    from: flight.from,
    to: flight.to,
    airline: flight.airline,
    departure: flight.departure,
    travelers,
    createdAt: new Date().toISOString(),
  };
  existing.push(booking);
  bookingsByUser.set(userKey, existing);
  return booking;
}
