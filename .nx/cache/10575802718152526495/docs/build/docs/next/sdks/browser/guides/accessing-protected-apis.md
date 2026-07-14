# Accessing Protected APIs

# Accessing Protected APIs

When building applications with ThunderID, you often need to call protected APIs that require authentication. The Browser SDK provides built-in methods for making authenticated HTTP requests with automatic token management.

## Using the Built-In HTTP Client

The `ThunderIDBrowserClient` provides `httpRequest()` and `httpRequestAll()` methods that automatically attach the access token as a Bearer token to outgoing requests.

### Basic API Request

```js title="src/api.js" showLineNumbers

async function fetchUserData(userId) {
  const response = await auth.httpRequest({
    url: `https://localhost:8090/users/$`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  return response.data
}
```

### PATCH Request

```js title="src/api.js" showLineNumbers

async function updateProfile(data) {
  const response = await auth.httpRequest({
    url: 'https://localhost:8090/users/me',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  })

  return response.data
}
```

### Parallel Requests

Use `httpRequestAll()` to make multiple authenticated requests in parallel:

```js title="src/api.js" showLineNumbers

async function loadDashboardData() {
  const [usersResponse, rolesResponse] = await auth.httpRequestAll([
    {
      url: 'https://localhost:8090/users',
      method: 'GET',
      headers: ,
    },
    {
      url: 'https://localhost:8090/roles',
      method: 'GET',
      headers: ,
    },
  ])

  return {
    users: usersResponse.data,
    roles: rolesResponse.data,
  }
}
```

## Using the Access Token Directly

If you prefer to use your own HTTP client (e.g., `fetch` or `axios`), retrieve the access token and attach it manually:

```js title="src/api.js" showLineNumbers

async function fetchWithToken(url) {
  const token = await auth.getAccessToken()

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer $`,
      Accept: 'application/json',
    },
  })

  return response.json()
}
```

> **Warning**
>
> When using the access token directly, you are responsible for handling token renewal and refresh. The built-in `httpRequest()` method handles this automatically.


## Error Handling

Handle API errors by catching exceptions from `httpRequest()`:

```js title="src/api.js" showLineNumbers

async function fetchData() {
  try {
    const response = await auth.httpRequest({
      url: 'https://localhost:8090/users',
      method: 'GET',
    })

    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expired or invalid — trigger re-authentication
      await auth.signIn()
    } else {
      console.error('API error:', error.message)
    }
  }
}
```

You can also use [Event Hooks](https://thunderid.dev/docs/next/sdks/browser/apis/hooks.md) to track HTTP request lifecycle events globally:

```js

auth.on(Hooks.HttpRequestError, (error) => {
  console.error('Request failed:', error)
})
```
