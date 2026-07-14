# Localization

# Localization

ThunderID includes built-in internationalization (i18n) support. You can localize authentication screens into the languages your users prefer and customize every piece of text on sign-in, sign-up, recovery, and consent screens.

## Core Concepts

Three dimensions identify every translation in ThunderID: a **language**, a **namespace**, and a **key**. Together, these determine what text appears on each authentication screen.

### Languages

A BCP 47 language tag such as `en-US`, `fr-FR`, or `ja-JP` identifies each language. When a user opens an authentication screen, ThunderID resolves the appropriate translations for that language and renders all text accordingly.

English (`en-US`) is the default language. To add or customize translations, see [Manage Translations](https://thunderid.dev/docs/next/guides/guides/manage-translations.md).

### Namespaces

Namespaces group translations by feature or screen type. The following namespaces ship with ThunderID by default:

| Namespace | Content |
|-----------|---------|
| `signin` | Sign-in screen text, including credential prompts, social login options, passkey support, and multi-factor authentication steps. |
| `signup` | Sign-up screen text, including registration forms, field labels, and social sign-up options. |
| `recovery` | Password recovery flow text, including username prompts, email notifications, and password reset forms. |
| `onboarding` | User onboarding and invitation flow text, including user creation forms, invite modes, and completion messages. |
| `invite` | Invitation link validation, completion messages, and error text. |
| `elements` | Shared UI element labels such as user type selectors and field placeholders. |

You can also create translations in custom namespaces. Namespace names accept only alphanumeric characters, underscores, and hyphens (maximum 64 characters).

> **Tip**
>
> Create a dedicated namespace for translations specific to your custom flows. This keeps your overrides separate from the default namespaces and avoids conflicts during upgrades.


### Keys

Each key uses dot-notation within a namespace and maps to a translated string. The namespace and key combination uniquely identifies a piece of text:

```
signin:forms.credentials.title          → "Sign In"
signup:forms.credentials.title          → "Sign Up"
recovery:forms.username.title           → "Password Recovery"
invite:complete.title                   → "Welcome Aboard!"
```

Keys may include `}` interpolation tokens that ThunderID replaces at render time with dynamic values:

```
invite:complete.description.withApp     → "Your account has been successfully set up for }."
```

## How Translations Resolve

When rendering an authentication screen, ThunderID resolves each translation key by merging two layers:

1. **System defaults**: Built-in English (`en-US`) translations that ship with ThunderID.
2. **Custom overrides**: Translations you provide through the API or through declarative configurations.

Custom overrides take priority over system defaults. You only need to provide overrides for the keys you want to change. All other keys fall back to the defaults automatically. See [Resolve Translations](https://thunderid.dev/docs/next/guides/guides/resolve-translations.md).

### Language Matching

ThunderID uses BCP 47 matching to select the best available language for a request. For example, a request for `fr` matches `fr-FR` if an exact `fr` entry does not exist. When multiple English variants exist, `en-US` takes priority over `en`.

For system-level translations (error messages, internal labels), ThunderID always includes `en-US` defaults as a fallback. For other namespaces such as `signin` or `signup`, the fallback applies only when a translation for that key exists in `en-US`.

## Relationship with Design

Localization and [design](https://thunderid.dev/docs/next/guides/guides/design/overview.md) are independent systems that work together at runtime:

- **Design** (themes and layouts) controls visual appearance: colors, fonts, spacing, and structure.
- **Localization** controls text content: labels, messages, and error strings.

You can change translations without affecting your visual design, and vice versa. Flow definitions reference translation keys through template expressions like `}` or `}`. These expressions resolve to the correct translated string when the screen renders.

## Next Steps


  - [Manage Translations](https://thunderid.dev/docs/next/guides/guides/manage-translations.md) — Add, update, and delete translations for your authentication screens through the API.
