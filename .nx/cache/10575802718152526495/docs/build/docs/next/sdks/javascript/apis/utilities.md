# Utilities

# Utilities

The SDK exports a set of utility functions used internally by platform SDKs and available to custom integrations.

## Encoding / Decoding

### `arrayBufferToBase64url(buffer)`

Encode an `ArrayBuffer` as a URL-safe Base64 string (no padding, `+` → `-`, `/` → `_`).

```ts

const encoded = arrayBufferToBase64url(buffer)
```

**Returns:** `string`

### `base64urlToArrayBuffer(str)`

Decode a Base64url string back to an `ArrayBuffer`.

```ts

const buffer = base64urlToArrayBuffer(encoded)
```

**Returns:** `ArrayBuffer`

---

## Authentication

### `extractUserClaimsFromIdToken(idToken)`

Decode a raw ID token string and return its payload as a plain object.

```ts

const claims = extractUserClaimsFromIdToken(idToken)
console.log(claims.sub, claims.email)
```

**Returns:** `Record<string, any>`

### `processOpenIDScopes(scopes)`

Normalize a scope value (string or array) to a single space-separated string, remove duplicates, and ensure `openid` is included.

```ts

processOpenIDScopes(['openid', 'profile', 'email'])
// 'openid profile email'

processOpenIDScopes('openid profile')
// 'openid profile'
```

**Returns:** `string`

### `processUsername(user)`

Derive a `username` property on a `User` object from available identity claims (prefers `preferred_username`, falls back to `email`, then `sub`).

```ts

const user = processUsername()
// user.username === 'alice@example.com'
```

**Returns:** `User`

---

## URL Utilities

### `isRecognizedBaseUrlPattern(baseUrl)`

Check whether a URL matches a known ThunderID base URL pattern.

```ts

isRecognizedBaseUrlPattern('https://localhost:8090') // true
isRecognizedBaseUrlPattern('https://localhost:8090')           // false
```

**Returns:** `boolean`

### `removeTrailingSlash(url)`

Remove a trailing slash from a URL string, if present.

**Returns:** `string`

---

## Data Utilities

### `deepMerge<T>(target, ...sources)`

Recursively merge source objects into `target`. Returns the mutated target.

```ts

const merged = deepMerge( },  })
//  }
```

**Returns:** `T`

### `isEmpty(value)`

Return `true` for `null`, `undefined`, empty strings, empty arrays, and empty objects.

```ts

isEmpty(null)   // true
isEmpty([])     // true
isEmpty('hi')   // false
```

**Returns:** `boolean`

### `get<T>(obj, path, defaultValue?)`

Read a value from a nested object using dot-notation path. Returns `defaultValue` if the path does not exist.

```ts

get( }, 'a.b')      // 42
get( }, 'a.b', 'fallback') // 'fallback'
```

**Returns:** `T`

### `set(obj, path, value)`

Write a value into a nested object at the given dot-notation path. Creates intermediate objects as needed.

```ts

const obj =
set(obj, 'a.b.c', 42)
// obj ===  } }
```

**Returns:** the mutated `obj`

---

## V2 Flow Utilities

### `isEmojiUri(uri)`

Check whether a string is an emoji URI (scheme `emoji://`).

**Returns:** `boolean`

### `extractEmojiFromUri(uri)`

Extract the emoji character from an emoji URI.

```ts

extractEmojiFromUri('emoji://🇺🇸') // '🇺🇸'
```

**Returns:** `string`

### `countryCodeToFlagEmoji(countryCode)`

Convert an ISO 3166-1 alpha-2 country code to its flag emoji.

```ts

countryCodeToFlagEmoji('US') // '🇺🇸'
```

**Returns:** `string`

### `resolveLocaleDisplayName(locale)`

Get the human-readable name for a BCP 47 locale using the browser's `Intl.DisplayNames` API.

```ts

resolveLocaleDisplayName('fr-FR') // 'French (France)'
```

**Returns:** `string`

### `resolveFlowTemplateLiterals(value, options)`

Resolve `}` and `}` template literals embedded in V2 flow component configurations.

```ts

const resolved = resolveFlowTemplateLiterals(
  '}',
   },
)
// 'Sign In'
```

**Returns:** The value with all recognized template literals replaced.

---

## Styling

### `bem(block, element?, modifier?)`

Build a BEM-style CSS class name.

```ts

bem('login-box')                    // 'login-box'
bem('login-box', 'title')           // 'login-box__title'
bem('login-box', 'title', 'large')  // 'login-box__title--large'
```

**Returns:** `string`

### `withVendorCSSClassPrefix(className)`

Prefix a CSS class name with the vendor prefix (`thunderid-` by default).

```ts

withVendorCSSClassPrefix('button') // 'thunderid-button'
```

**Returns:** `string`

---

## Logging

The SDK exports a structured logger and factory functions.

```ts

// Global logger
logger.info('Initialized')

// Package-scoped logger
const log = createPackageLogger('@thunderid/browser')
log.debug('signIn called')
```

### Logger Factory Functions

| Function | Description |
|----------|-------------|
| `createLogger(config?)` | Create a root logger with optional `LoggerConfig` |
| `createComponentLogger(component)` | Create a logger scoped to a component name |
| `createPackageLogger(pkg)` | Create a logger scoped to a package name |
| `createPackageComponentLogger(pkg, component)` | Create a logger scoped to both package and component |
| `configureLogger(config)` | Update the global logger configuration |

### Shorthand Functions

`debug(message, ...args)`, `info(message, ...args)`, `warn(message, ...args)`, `error(message, ...args)` — log at the corresponding level using the global logger.

### `LogLevel`

| Value | Description |
|-------|-------------|
| `'debug'` | Verbose diagnostic output |
| `'info'` | General informational messages |
| `'warn'` | Non-fatal warnings |
| `'error'` | Error conditions |
| `'none'` | Suppress all logging |
