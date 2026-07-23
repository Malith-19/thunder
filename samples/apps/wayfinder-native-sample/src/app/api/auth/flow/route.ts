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
import {
  exchangeAssertion,
  initiateFlow,
  submitFlowStep,
  type FlowResponse,
  type FlowType,
} from "@/lib/thunderid";
import { saveTokens } from "@/lib/session";

/**
 * Single proxy endpoint that drives a ThunderID native flow.
 *
 * The browser sends only non-secret step data. This handler injects the Flow
 * Secret (on start), exchanges the completion assertion for tokens, and stores
 * them in the HttpOnly session. The assertion and tokens never reach the client.
 *
 * Request body (start):     { flowType: "AUTHENTICATION" | "REGISTRATION" | "RECOVERY" }
 * Request body (continue):  { executionId, action?, inputs?, challengeToken? }
 */
export async function POST(request: Request) {
  let body: {
    flowType?: FlowType;
    executionId?: string;
    action?: string;
    inputs?: Record<string, string>;
    challengeToken?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    let response: FlowResponse;

    if (body.executionId) {
      response = await submitFlowStep({
        executionId: body.executionId,
        action: body.action,
        inputs: body.inputs,
        challengeToken: body.challengeToken,
      });
    } else if (body.flowType) {
      response = await initiateFlow(body.flowType);
    } else {
      return NextResponse.json(
        { error: "Provide either a flowType (start) or an executionId (continue)" },
        { status: 400 },
      );
    }

    return NextResponse.json(await normalize(response));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Flow request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/**
 * Turn a raw ThunderID flow response into a client-safe payload. On completion
 * the assertion is exchanged server-side and never leaves the BFF.
 */
async function normalize(response: FlowResponse) {
  if (response.flowStatus === "ERROR") {
    return {
      done: false,
      error: response.failureReason || response.error?.message || "Authentication error",
    };
  }

  if (response.flowStatus === "COMPLETE") {
    if (response.assertion) {
      const tokens = await exchangeAssertion(response.assertion);
      const user = await saveTokens(tokens);
      return { done: true, authenticated: true, user };
    }
    // Flows such as password recovery complete without issuing an assertion.
    return { done: true, authenticated: false };
  }

  // INCOMPLETE: return only what the client needs to render the next step.
  return {
    done: false,
    executionId: response.executionId,
    challengeToken: response.challengeToken,
    type: response.type ?? "VIEW",
    data: {
      inputs: response.data?.inputs ?? [],
      actions: response.data?.actions ?? [],
      redirectURL: response.data?.redirectURL,
    },
  };
}
