# Accessing Protected APIs

# Accessing Protected APIs

When building applications with ThunderID, you'll often need to call protected APIs that require authentication. This guide shows you how to make authenticated HTTP requests using the ThunderID React SDK.

## Using SDK Built-in HTTP Client

When your application is wrapped with `ThunderIDProvider`, you can use the `useThunderID` hook to access the authenticated `http` module. This module has the following features:

- Includes the necessary authentication headers (Bearer token)
- Handles token refresh when tokens expire
- Provides methods like `request()` and `requestAll()` for making API calls

:::tip Accessing the HTTP Client
You can access the `http` client in two ways:

1. **Inside a component**: Use the `useThunderID` hook to get the `http` instance
   ```jsx
   const  = useThunderID()
   ```

2. **Outside a component** (e.g., in utility functions or services): Import `http` directly
   ```jsx
   import  from '@thunderid/react'
   ```
:::

### Basic API Request

The following examples show how to use the ThunderID SDK's `http` module to call a protected API endpoint.

#### Using the Hook Inside a Component

```jsx title="src/UserProfile.jsx" showLineNumbers


export default function UserProfile() {
  const  = useThunderID()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (!isSignedIn) {
      return
    }

    (async () => {
      try {
        const response = await http.request({
          url: 'https://localhost:8090/users/<user_id>',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        })

        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    })()
  }, [http, isSignedIn])

  if (!isSignedIn) {
    return Please sign in to view your profile.
  }

  return (

      <h2>User Profile</h2>
      </pre>}

  )
}
```

#### Using Direct Import Outside a Component

```jsx title="src/services/userService.js" showLineNumbers

export async function fetchUser(userId) {
  try {
    const response = await http.request({
      url: `https://localhost:8090/users/$`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
```

```jsx title="src/UserProfile.jsx" showLineNumbers


export default function UserProfile() {
  const  = useThunderID()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (!isSignedIn) {
      return
    }

    (async () => {
      try {
        const data = await fetchUser('<user_id>')
        setUserData(data)
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    })()
  }, [isSignedIn])

  if (!isSignedIn) {
    return Please sign in to view your profile.
  }

  return (

      <h2>User Profile</h2>
      </pre>}

  )
}
```

:::tip API Configuration
Replace `<user_id>` with the actual user ID you want to fetch. The ThunderID API server runs on `https://localhost:8090` by default.
:::

:::note Storage Type Requirement
The storage type must be set to `webWorker` for the token to be automatically attached. If it's set to `sessionStorage` or `localStorage`, you may implement your own function for attaching the access token to the network request.
:::

> **Warning**
>
> Note that you don't need to manually specify the Authorization header, as the `http` function intercepts the request and attaches the access token automatically. The final request config sent by the `http` function would be:


### Parallel API Requests

To send multiple API requests in parallel, use the `httpRequestAll` function. It triggers parallel network requests and returns responses after all requests are completed.

The following code snippet shows how to send multiple network requests in parallel:

```jsx title="src/UserProfile.jsx" showLineNumbers


export default function UserProfile() {
  const  = useThunderID()
  const [ userData, setUserData ] = useState({
    profile: null,
    applications: [],
  })

  useEffect(() => {
    if (!isSignedIn) {
      return
    }

    const requests = []

    requests.push({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: 'https://localhost:8090/users/<user_id>',
    })

    requests.push({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: 'https://localhost:8090/applications',
    })

    (async () => {
      try {
        const response = await http.requestAll(requests)

        setUserData({
          profile: response[0].data,
          applications: response[1].data,
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })()
  }, [http, isSignedIn])

  return <pre></pre>
}
```

## Using a GraphQL Client

If you are not using `webWorker` as the storage type, use the `getAccessToken` function to fetch the access token. Then manually attach the token to the GraphQL client's authentication headers.

:::note Storage Type Limitation
This approach is not available when the storage type is set to `webWorker`. The SDK automatically manages the access token and does not expose it to the main thread.
:::

The following example shows how to configure a GraphQL client with authentication using the access token:

```jsx title="src/graphql/client.js" showLineNumbers


export function createAuthenticatedClient(accessToken) {
  const httpLink = createHttpLink({
    uri: 'https://localhost:8090/graphql',
  })

  const authLink = setContext((_, ) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer $` : '',
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
```

```jsx title="src/UserProfile.jsx" showLineNumbers


const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      username
      firstName
      lastName
    }
  }
`

export default function UserProfile() {
  const  = useThunderID()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (!isSignedIn) {
      return
    }

    (async () => {
      try {
        const accessToken = await getAccessToken()
        const client = createAuthenticatedClient(accessToken)

        const  = await client.query({
          query: GET_USER,
          variables: ,
        })

        setUserData(data.user)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    })()
  }, [isSignedIn, getAccessToken])

  if (!isSignedIn) {
    return Please sign in to view your profile.
  }

  return (

      <h2>User Profile</h2>
      </pre>}

  )
}
```

> **Tip**
>
> Replace `<user_id>` with the actual user ID you want to fetch. This example uses Apollo Client, but you can apply the same pattern with other GraphQL clients like urql or graphql-request.
