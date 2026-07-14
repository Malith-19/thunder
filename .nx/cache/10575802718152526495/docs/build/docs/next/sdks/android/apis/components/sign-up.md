# SignUp

# `SignUp`

The `SignUp` composable renders a full app-native registration form. It drives the Flow Execution API loop automatically — initiating the registration flow, presenting the server-defined inputs and actions on each step, and completing when the user is registered and authenticated.

`SignUp` requires `ThunderIDProvider` in its ancestor composable hierarchy.

## Usage

```kotlin
import dev.thunderid.compose.components.presentation.auth.SignUp

@Composable
fun RegisterView() {
    SignUp(modifier = Modifier.fillMaxWidth().padding(16.dp))
}
```

## Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `modifier` | `Modifier` | ❌ | Compose modifier applied to the form container. |
| `onComplete` | `(() -> Unit)?` | ❌ | Called when registration completes successfully. |
| `onError` | `((String) -> Unit)?` | ❌ | Called with an error message when a flow step fails. |

## Handling Completion

```kotlin
SignUp(
    onComplete = {
        // user is now registered and signed in
    },
    onError = { errorMessage ->
        println("Registration error: $errorMessage")
    }
)
```

## Customization with `BaseSignUp`

`BaseSignUp` is the unstyled builder variant. It manages the Flow Execution loop and passes a `SignUpState` to your content lambda.

```kotlin
import dev.thunderid.compose.components.presentation.auth.BaseSignUp

@Composable
fun CustomRegisterView() {
    BaseSignUp { signUpState ->
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            signUpState.error?.let

            signUpState.inputs.forEach { input ->
                var value by signUpState.binding(input.name)
                OutlinedTextField(value, onValueChange = , label = )
            }

            signUpState.actions.forEach { action ->
                Button(
                    onClick = ,
                    enabled = !signUpState.isLoading
                ) {
                    Text(action.label ?: "Create Account")
                }
            }
        }
    }
}
```

`SignUpState` has the same shape as [`SignInState`](https://thunderid.dev/docs/next/sdks/android/apis/components/sign-in.md#signinstate-properties): `inputs`, `actions`, `isLoading`, `error`, `binding(name)`, and `submit(actionId)`.
