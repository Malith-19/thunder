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
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Mode = "signin" | "signup" | "recovery";

interface FlowInput {
  ref?: string;
  identifier: string;
  type: string;
  required?: boolean;
}

interface FlowAction {
  ref: string;
  nextNode?: string;
}

interface FlowState {
  executionId?: string;
  challengeToken?: string;
  inputs: FlowInput[];
  actions: FlowAction[];
}

interface FlowApiResponse {
  done: boolean;
  authenticated?: boolean;
  error?: string;
  executionId?: string;
  challengeToken?: string;
  type?: string;
  data?: { inputs?: FlowInput[]; actions?: FlowAction[]; redirectURL?: string };
}

const FLOW_TYPE: Record<Mode, string> = {
  signin: "AUTHENTICATION",
  signup: "REGISTRATION",
  recovery: "RECOVERY",
};

const HEADING: Record<Mode, string> = {
  signin: "Sign in",
  signup: "Create your account",
  recovery: "Reset your password",
};

export function FlowRunner({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [flowState, setFlowState] = useState<FlowState | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recoveryDone, setRecoveryDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // A recovery email link returns to /recovery?executionId=...&inviteToken=...
    const params = new URLSearchParams(window.location.search);
    const executionId = params.get("executionId") || params.get("id");
    if (executionId) {
      const hidden: Record<string, string> = {};
      const skip = new Set(["executionId", "id", "applicationId", "code", "state"]);
      params.forEach((value, key) => {
        if (!skip.has(key)) hidden[key] = value;
      });
      window.history.replaceState({}, "", window.location.pathname);
      void call({ executionId, inputs: Object.keys(hidden).length ? hidden : undefined });
    } else {
      void call({ flowType: FLOW_TYPE[mode] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function call(payload: Record<string, unknown>) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: FlowApiResponse = await res.json();
      await handleResponse(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResponse(data: FlowApiResponse) {
    if (data.error) {
      setError(data.error);
      return;
    }

    if (data.done) {
      if (data.authenticated) {
        router.push("/");
        router.refresh();
      } else if (mode === "recovery") {
        setFlowState(null);
        setRecoveryDone(true);
      } else {
        router.push("/signin");
      }
      return;
    }

    const inputs = data.data?.inputs ?? [];
    const actions = data.data?.actions ?? [];
    const visible = inputs.filter((i) => i.type !== "HIDDEN");

    // Auto-advance a step that has a single action and nothing to collect.
    if (actions.length === 1 && visible.length === 0) {
      await call({
        executionId: data.executionId,
        action: actions[0].ref,
        challengeToken: data.challengeToken,
      });
      return;
    }

    setFlowState({
      executionId: data.executionId,
      challengeToken: data.challengeToken,
      inputs,
      actions,
    });
  }

  function setField(identifier: string, value: string) {
    setValues((prev) => ({ ...prev, [identifier]: value }));
  }

  async function submit(actionRef: string) {
    if (!flowState) return;
    const visible = flowState.inputs.filter((i) => i.type !== "HIDDEN");
    for (const input of visible) {
      if (input.required && !values[input.identifier]) {
        setError(`${labelFor(input)} is required.`);
        return;
      }
    }
    const inputs: Record<string, string> = {};
    for (const input of flowState.inputs) {
      if (values[input.identifier] !== undefined) inputs[input.identifier] = values[input.identifier];
    }
    await call({
      executionId: flowState.executionId,
      action: actionRef,
      inputs: Object.keys(inputs).length ? inputs : undefined,
      challengeToken: flowState.challengeToken,
    });
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-logo" aria-hidden="true">
          ✈️
        </div>
        {recoveryDone ? (
          <RecoverySuccess />
        ) : (
          <>
            <h1 className="auth-heading">{HEADING[mode]}</h1>
            {error && (
              <div className="error-box" role="alert">
                {error}
              </div>
            )}
            {loading && !flowState && <p className="status-line">Loading…</p>}
            {flowState && (
              <FlowStep
                flowState={flowState}
                values={values}
                loading={loading}
                mode={mode}
                onField={setField}
                onSubmit={submit}
              />
            )}
            <ModeLinks mode={mode} />
          </>
        )}
      </div>
    </div>
  );
}

function FlowStep({
  flowState,
  values,
  loading,
  mode,
  onField,
  onSubmit,
}: {
  flowState: FlowState;
  values: Record<string, string>;
  loading: boolean;
  mode: Mode;
  onField: (id: string, value: string) => void;
  onSubmit: (actionRef: string) => void;
}) {
  const visible = flowState.inputs.filter((i) => i.type !== "HIDDEN");
  const actions = flowState.actions;

  // Multiple actions (e.g. a choice screen): render each as a button.
  if (actions.length > 1) {
    return (
      <div>
        {visible.map((input) => (
          <Field
            key={input.identifier}
            input={input}
            value={values[input.identifier] || ""}
            disabled={loading}
            onChange={(v) => onField(input.identifier, v)}
          />
        ))}
        <div className="action-group">
          {actions.map((action) => (
            <button
              key={action.ref}
              type="button"
              className={`btn ${isDeny(action.ref) ? "btn-secondary" : "btn-primary"}`}
              disabled={loading}
              onClick={() => onSubmit(action.ref)}
            >
              {loading ? "Loading…" : actionLabel(action.ref, mode)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const primary = actions[0];
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (primary) onSubmit(primary.ref);
      }}
    >
      {visible.map((input) => (
        <Field
          key={input.identifier}
          input={input}
          value={values[input.identifier] || ""}
          disabled={loading}
          onChange={(v) => onField(input.identifier, v)}
        />
      ))}
      {primary && (
        <button type="submit" className="btn btn-primary full-width" disabled={loading}>
          {loading ? "Loading…" : submitLabel(primary.ref, visible, mode)}
        </button>
      )}
    </form>
  );
}

function Field({
  input,
  value,
  disabled,
  onChange,
}: {
  input: FlowInput;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  const type = htmlType(input.type);
  return (
    <label className="field">
      <span className="field-label">
        {labelFor(input)}
        {input.required && <span className="required"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        required={input.required}
        autoComplete={type === "password" ? "current-password" : type === "email" ? "email" : "off"}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function RecoverySuccess() {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 30, margin: 0 }}>✅</p>
      <h2 className="auth-heading">Password updated</h2>
      <p className="muted">Sign in with your new password.</p>
      <Link href="/signin" className="btn btn-primary full-width">
        Go to sign in
      </Link>
    </div>
  );
}

function ModeLinks({ mode }: { mode: Mode }) {
  return (
    <div className="auth-links">
      {mode === "signin" && (
        <>
          <span>
            Don&apos;t have an account? <Link href="/signup">Create one</Link>
          </span>
          <span>
            <Link href="/recovery">Forgot your password?</Link>
          </span>
        </>
      )}
      {mode === "signup" && (
        <span>
          Already have an account? <Link href="/signin">Sign in</Link>
        </span>
      )}
      {mode === "recovery" && (
        <span>
          Remember your password? <Link href="/signin">Sign in</Link>
        </span>
      )}
    </div>
  );
}

function htmlType(type: string): string {
  switch (type) {
    case "PASSWORD_INPUT":
      return "password";
    case "EMAIL_INPUT":
      return "email";
    case "PHONE_INPUT":
      return "tel";
    default:
      return "text";
  }
}

function labelFor(input: FlowInput): string {
  return input.identifier
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function isDeny(ref: string): boolean {
  return ref.endsWith("_deny") || ref.endsWith("_reject");
}

function actionLabel(ref: string, mode: Mode): string {
  const prefix = mode === "signup" ? "Sign up" : "Continue";
  if (ref.includes("google")) return `${prefix} with Google`;
  if (ref.includes("github")) return `${prefix} with GitHub`;
  if (ref.endsWith("_allow")) return "Allow";
  if (ref.endsWith("_deny")) return "Deny";
  const cleaned = ref.replace(/^action_role_/, "").replace(/^action_/, "").replace(/_/g, " ").trim();
  if (!cleaned || /^\d+$/.test(cleaned)) return "Continue";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function submitLabel(ref: string, visible: FlowInput[], mode: Mode): string {
  const lower = ref.toLowerCase();
  const hasPassword = visible.some((i) => i.type === "PASSWORD_INPUT" || i.identifier === "password");
  if (lower.includes("username") && mode === "recovery") return "Send recovery link";
  if (hasPassword) {
    if (mode === "recovery") return "Reset password";
    if (mode === "signup") return "Create account";
    return "Sign in";
  }
  return "Continue";
}
