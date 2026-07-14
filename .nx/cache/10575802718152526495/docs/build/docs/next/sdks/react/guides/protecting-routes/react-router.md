# React Router

# React Router

`@thunderid/react-router` is a supplementary package that provides seamless integration between ThunderID authentication and React Router. It offers components to easily protect routes and handle authentication flows in your React applications.

## Installation


<CodeBlock icon="npm" label="npm">
```bash
npm install @thunderid/react-router
```


```bash
yarn add @thunderid/react-router
```


```bash
pnpm add @thunderid/react-router
```

</CodeGroup>

## Basic Setup with ProtectedRoute

```tsx title="src/App.tsx" showLineNumbers


function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element= />
          } />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute redirectTo="/signin">


            }
          />



            }
          />
        </Routes>
      </BrowserRouter>
    </ThunderIDProvider>
  )
}

export default App
```

## Custom Fallback and Loading States

You can customize the behavior of `ProtectedRoute` with custom fallback components and loading states:

```tsx title="src/App.tsx" showLineNumbers

// Redirect to custom login page



  }
/>

// Custom fallback component

          <h2>Please sign in</h2>
          <p>You need to be signed in to access this page.</p>
        </div>
      }
    >


  }
/>

// Custom loading state
Loading...</div>}>


  }
/>
```

## Integration with Layouts

Protect multiple routes using a shared layout:

```tsx title="src/App.tsx" showLineNumbers

function App() {
  return (

      <Routes>

        } />
        } />
        } />


        }>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute redirectTo="/signin">


            }
          />



            }
          />



            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```
