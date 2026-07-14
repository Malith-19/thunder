# Manage Translations

# Manage Translations

Add, update, and delete translations through the ThunderID Console or the i18n API.

## Prerequisites

- **Console**: Access to the ThunderID Console.
- The language tag for your target locale in BCP 47 format (for example, `es` for Spanish, `fr-CA` for Canadian French). See [Validation Rules](https://thunderid.dev/docs/next/guides/guides/i18n/..md#validation-rules) for format constraints.

## Add a Language


### Start the Add Language Wizard

Navigate to **Translations** in the ThunderID Console and click **Add Language**.

### Select a Country

Select the country associated with the language you want to add.

### Select a Language

Choose the language variant for the selected country. The available options depend on the country you selected in the previous step.

### Review the Locale Code

Review the generated BCP 47 locale code. You can override the code if you need a custom locale tag.

### Initialize Translations

Choose how to initialize translations for the new language:

- **Populate from English**: Copy all default `en-US` translation values as a starting point.
- **Leave empty**: Start with no translations and add them manually. See [Validation Rules](https://thunderid.dev/docs/next/guides/guides/i18n/..md#validation-rules) for format constraints.

Click **Create** to finish. ThunderID creates the language and opens the translation editor.


## Update Translations

1. Navigate to **Translations** in the ThunderID Console and open the language you want to edit.
2. Select a **Namespace** to filter translations for a specific screen (for example, `signin` or `recovery`).
3. Edit translation values using either the **Fields** view for individual key-value pairs or the **JSON** editor for bulk changes.
4. Click **Save** to apply your changes.

## Delete Translations

1. Navigate to **Translations** in the ThunderID Console.
2. Click the delete icon on the language you want to remove and confirm the deletion.

> **Warning**
>
> Deleting a language removes all custom translation overrides for that language. System defaults still apply for any keys that have default values.


> **Note**
>
> Translations loaded through declarative configurations become read-only. You cannot update or delete them.


## Validation Rules

The i18n API enforces the following format rules:

| Field | Rule | Example |
|-------|------|---------|
| Language | Valid BCP 47 tag. | `en-US`, `fr`, `ja-JP` |
| Namespace | Alphanumeric characters, underscores, and hyphens. Maximum 64 characters. | `signin`, `recovery`, `my-app` |
| Key | Alphanumeric characters, dots, underscores, and hyphens. Maximum 256 characters. | `forms.credentials.title`, `forms.username.title` |
| Value | Non-empty string. Maximum 4096 characters. | `Welcome back` |


## Reference

- [Resolve Translations](https://thunderid.dev/docs/next/guides/guides/resolve-translations.md): API reference, validation rules, and error codes for translations.
- [Localization](https://thunderid.dev/docs/next/guides/guides/localization.md): Learn how languages, namespaces, and translation resolution work.
