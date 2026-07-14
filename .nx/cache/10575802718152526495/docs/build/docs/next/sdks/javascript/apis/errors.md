# Errors

# Errors

The SDK uses a hierarchy of typed error classes. Catch specific classes to handle different failure modes distinctly.

## Error Hierarchy

```
Error
└── ThunderIDError
    ├── ThunderIDAPIError
    └── ThunderIDRuntimeError
ThunderIDAuthException  (separate — thrown by auth flow internals)
```

---

## `ThunderIDError`

Base class for all SDK errors. Extends native `Error`.

```ts

try {
  await client.initialize(config)
} catch (err) {
  if (err instanceof ThunderIDError) {
    console.error(err.code, err.origin, err.message)
  }
}
```

### Constructor

```ts
new ThunderIDError(message: string, code: string, origin: string)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | `string` | Human-readable error description |
| `code` | `string` | Machine-readable error code (e.g., `'JS-AUTH_CORE-RAT1-NF01'`) |
| `origin` | `string` | The function or component that originated the error |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `message` | `string` | Human-readable description |
| `code` | `string` | Machine-readable error code |
| `origin` | `string` | Originating function name |

---

## `ThunderIDAPIError`

Thrown when the ThunderID REST API returns an error response (4xx or 5xx).

```ts

try {
  await getOrganization()
} catch (err) {
  if (err instanceof ThunderIDAPIError) {
    console.error(err.statusCode, err.statusText)
  }
}
```

### Constructor

```ts
new ThunderIDAPIError(
  message: string,
  code: string,
  origin: string,
  statusCode?: number,
  statusText?: string,
  prefix?: string,
)
```

### Properties (Extends `ThunderIDError`)

| Property | Type | Description |
|----------|------|-------------|
| `statusCode` | `number` | HTTP status code of the API response |
| `statusText` | `string` | HTTP status text (e.g., `'Not Found'`, `'Unauthorized'`) |

---

## `ThunderIDRuntimeError`

Thrown when an error occurs during SDK runtime operations unrelated to the API (e.g., storage failures, configuration errors).

```ts

try {
  client.clearSession()
} catch (err) {
  if (err instanceof ThunderIDRuntimeError) {
    console.error(err.details)
  }
}
```

### Constructor

```ts
new ThunderIDRuntimeError(
  message: string,
  code: string,
  origin: string,
  details?: unknown,
)
```

### Properties (Extends `ThunderIDError`)

| Property | Type | Description |
|----------|------|-------------|
| `details` | `unknown` | Additional context about the error (original exception, state dump, etc.) |

---

## `ThunderIDAuthException`

Thrown by the core authentication flow methods within `ThunderIDJavaScriptClient` (e.g., `getSignInUrl()`, `requestAccessToken()`, `getSignOutUrl()`). Not a subclass of `ThunderIDError`.

```ts

try {
  await client.signIn()
} catch (err) {
  if (err instanceof ThunderIDAuthException) {
    console.error('Auth failed:', err.message)
  }
}
```

### Error Codes

Auth exception codes follow the pattern `JS-AUTH_CORE-<OPERATION>-<TYPE><INDEX>`:

| Suffix | Meaning |
|--------|---------|
| `-NF01` | Not found (missing endpoint or parameter) |
| `-NE02` | Network error (fetch failed) |
| `-HE03` | HTTP error (non-2xx response) |
| `-IV02` | Invalid (resolution or parsing failure) |

---

## Catching All SDK Errors

```ts

try {
  await client.signIn()
} catch (err) {
  if (err instanceof ThunderIDAPIError) {
    // Handle API-level errors (HTTP 4xx/5xx from ThunderID)
    console.error(`API error $: $`)
  } else if (err instanceof ThunderIDAuthException) {
    // Handle auth flow errors (PKCE, token exchange, endpoint resolution)
    console.error(`Auth error [$]`)
  } else if (err instanceof ThunderIDRuntimeError) {
    // Handle runtime/internal errors
    console.error(`Runtime error: $`, err.details)
  } else if (err instanceof ThunderIDError) {
    // Catch-all for any other SDK error
    console.error(`SDK error [$]: $`)
  } else {
    throw err  // Re-throw unexpected errors
  }
}
```
