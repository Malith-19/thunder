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

import { useEffect, useState } from "react";

type Attributes = Record<string, unknown>;

export function ProfileDetails() {
  const [attributes, setAttributes] = useState<Attributes | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/me")
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Failed to load profile");
        return body;
      })
      .then((body) => {
        if (active) setAttributes((body.data?.attributes as Attributes) ?? body.data ?? {});
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return <div className="error-box">{error}</div>;
  }
  if (!attributes) {
    return <p className="status-line">Loading profile…</p>;
  }

  const entries = Object.entries(attributes).filter(
    ([, value]) => value !== null && value !== undefined && typeof value !== "object",
  );

  return (
    <div className="panel">
      <dl className="detail-list">
        {entries.map(([key, value]) => (
          <div key={key} style={{ display: "contents" }}>
            <dt>{key}</dt>
            <dd>{String(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
