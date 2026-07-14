# UserProfile

# `UserProfile`

The `UserProfile` composable renders an editable profile form. It loads the user's current profile from `/scim2/Me` when it first composes, presents editable fields for `displayName` and `phoneNumbers`, and saves changes via `ThunderIDClient.updateUserProfile`.

`UserProfile` requires `ThunderIDProvider` in its ancestor composable hierarchy.

## Usage

```kotlin
import dev.thunderid.compose.components.presentation.user.UserProfile

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileSheet(onDismiss: () -> Unit) {
    ModalBottomSheet(onDismissRequest = onDismiss) {
        UserProfile(
            modifier = Modifier.fillMaxWidth().padding(24.dp),
            onSaved = onDismiss
        )
    }
}
```

## Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `modifier` | `Modifier` | ❌ | Compose modifier applied to the form container. |
| `onSaved` | `(() -> Unit)?` | ❌ | Called after a successful profile save. |
| `onError` | `(() -> Unit)?` | ❌ | Called when a load or save operation fails. |

## Example: Present as a Modal Bottom Sheet

```kotlin
@Composable
fun HomeView() {
    var showProfile by remember

    OutlinedButton(onClick = ) {
        Text("Edit Profile")
    }

    if (showProfile) {
        ModalBottomSheet(onDismissRequest = ) {
            Column(modifier = Modifier.padding(24.dp)) {
                UserProfile(
                    modifier = Modifier.fillMaxWidth(),
                    onSaved = ,
                    onError =
                )
            }
        }
    }
}
```

## Customization with `BaseUserProfile`

`BaseUserProfile` is the unstyled builder variant. It manages the load and save operations and passes the current state to your content lambda.

```kotlin
import dev.thunderid.compose.components.presentation.user.BaseUserProfile

@Composable
fun CustomProfileView() {
    BaseUserProfile(
        onSaved = ,
        onError =
    ) { profile, fields, isLoading, error, save ->
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            error?.let

            fields["displayName"]?.let { state ->
                var value by state
                OutlinedTextField(
                    value = value,
                    onValueChange = ,
                    label =
                )
            }

            Button(
                onClick = save,
                enabled = !isLoading
            ) {
                Text(if (isLoading) "Saving…" else "Save")
            }
        }
    }
}
```

### `BaseUserProfile` Content Lambda Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `profile` | `UserProfile?` | The loaded profile from `/scim2/Me`. `null` before the first load completes. |
| `fields` | `Map<String, MutableState<String>>` | Mutable states for editable fields: `"displayName"` and `"phoneNumbers"`. |
| `isLoading` | `Boolean` | `true` while a load or save operation is in progress. |
| `error` | `String?` | Error message from the last failed operation. `null` on success. |
| `save` | `() -> Unit` | Call this to submit the edited field values. |
