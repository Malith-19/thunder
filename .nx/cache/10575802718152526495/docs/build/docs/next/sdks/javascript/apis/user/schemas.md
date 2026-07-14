# User Schemas

# User Schemas

The SDK provides helpers for working with user schema data.

## Utility Functions

### `flattenUserSchema(schemas, user)`

Produce a flat `Record<string, any>` from nested attribute paths.

```ts

const flat = flattenUserSchema(schemas, userProfile)
```

### `generateUserProfile(flatProfile, schemas)`

Convert a flat profile map back to a typed `UserProfile`.

```ts

const profile = generateUserProfile(flatProfile, schemas)
```

**Returns:** `UserProfile` — ``

### `generateFlattenedUserProfile(profile, schemas)`

Generate a flattened version of a full user profile.

```ts

const flat = generateFlattenedUserProfile(user, schemas)
```

**Returns:** `User`

### `resolveFieldType(type)`

Map an attribute type string to a `FieldType` enum value for rendering form inputs.

```ts

const fieldType = resolveFieldType('STRING') // FieldType.Text
```

### `resolveFieldName(schema, path)`

Resolve a human-readable display name for an attribute path.
