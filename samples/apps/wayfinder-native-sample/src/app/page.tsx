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

import { BookButton } from "@/components/BookButton";
import { listFlights } from "@/lib/mock-data";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;
  const flights = listFlights(from, to);

  return (
    <div>
      <section className="hero">
        <h1>Find your next flight</h1>
        <p>Search fares and book in seconds. Sign in happens right here, no redirects.</p>
      </section>

      <form className="search-card" action="/" method="get">
        <label>
          From
          <input name="from" defaultValue={from ?? ""} placeholder="Colombo" />
        </label>
        <label>
          To
          <input name="to" defaultValue={to ?? ""} placeholder="Singapore" />
        </label>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <h2 className="section-title">
        {from || to ? "Matching flights" : "Popular flights"}
      </h2>

      {flights.length === 0 ? (
        <p className="muted">No flights match your search. Try another route.</p>
      ) : (
        <div className="flight-grid">
          {flights.map((flight) => (
            <div className="flight-card" key={flight.id}>
              <span className="flight-route">
                {flight.from} → {flight.to}
              </span>
              <span className="flight-meta">
                {flight.airline} · departs {flight.departure} · {flight.duration}
              </span>
              <div className="flight-foot">
                <span className="flight-price">${flight.price}</span>
                <BookButton flightId={flight.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
