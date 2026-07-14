# Design

# Design

ThunderID gives you full control over the visual appearance and structure of your user-facing screens. You can tailor every screen, including sign-in, sign-up, recovery, and consent, to match your brand and deliver a consistent user experience.

## What You Can Customize

Design customization in ThunderID covers two independent areas:

- **Themes** (visual styling): Configure color palettes, typography, shapes, and visual effects. Each theme supports separate styles per color scheme (light or dark) and both left-to-right and right-to-left text directions.
- **Layouts** (screen structure): Define the arrangement, sizing, spacing, element visibility, and custom stylesheets for each screen.

Because these two areas are independent, you can update a theme without affecting the layout, and vice versa.

> **Tip**
>
> To localize screen text, see [Localization](https://thunderid.dev/docs/next/guides/guides/i18n/localization.md).


> **Note**
>
> Layouts loaded through declarative configurations become read-only. You cannot update or delete.


## How Design Is Applied

Design configurations are scoped per application or organizational unit. You can assign a separate theme and layout to each application or organizational unit. When a user opens an authentication screen, ThunderID resolves the matching design configuration for that context and renders the screen accordingly.

To create, update, or delete design configurations, you need access to the ThunderID Console or an access token with the `system` scope. Resolve endpoints are public and require no authentication.

## Next Steps


  - [Themes](https://thunderid.dev/docs/next/guides/guides/themes.md) — Configure color palettes, typography, and visual effects for your screens.
  - [Layouts](https://thunderid.dev/docs/next/guides/guides/layouts.md) — Configure screen structure, sections, and custom stylesheets for your screens.
  - [Localization](https://thunderid.dev/docs/next/guides/i18n/localization.md) — Understand how languages, namespaces, and translation resolution work.
