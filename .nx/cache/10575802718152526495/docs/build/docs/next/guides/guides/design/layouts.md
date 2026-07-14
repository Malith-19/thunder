# Layouts

# Layouts

A layout defines the structural composition of authentication screens. While a [theme](https://thunderid.dev/docs/next/guides/guides/themes.md) controls visual styling (colors, fonts), a layout controls how screen elements are arranged, including header, main content area, and footer slots, along with their sizing, spacing, and visibility.

## Layout Properties

Each layout includes the following configurable properties. For detailed property references, see [Design Catalog](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#layout-properties).

| Property | Description |
|----------|-------------|
| **Screen Type** | The `centered` template, which positions the main content container at the center of the screen. See [Screen Type](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#screen-type). |
| **Custom Stylesheets** | Inject inline or external CSS stylesheets for customizations beyond theme properties. See [Custom Stylesheets](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#custom-stylesheets). |

## Create a Layout


### Select a Layout Preset

1. Sign in to the ThunderID Console.
2. Navigate to **Design** from the sidebar.
3. In the **Layouts** section, click a layout preset. The **Centered** layout positions the main content container at the center of the screen.

ThunderID creates the layout with default settings and opens the layout builder.

> **Note**
>
> Additional layout presets (Split, Full Screen, Popup) will be available in future releases.


### Customize the Layout

Use the layout builder to adjust your layout:

- **Theme Preview**: Preview how the layout pairs with different themes.
- **Custom CSS**: Add inline or external stylesheets from the right panel.
- **Element Inspector**: Click any element in the preview to auto-generate a CSS selector.

Click **Save** to apply your changes.

### Assign the Layout to an Application

Open your application in the ThunderID Console, navigate to **Customization** settings, and select your layout.


## Update a Layout

1. Navigate to **Design** in the ThunderID Console and click the layout you want to edit. The layout builder opens with a live preview.
2. Edit your custom stylesheets in the right panel, or use the element inspector to target specific elements.
3. Click **Save** to apply your changes.

Changes take effect immediately for new authentication sessions.

## Delete a Layout

You cannot delete layouts created through the Console from the Console. Use the API to delete a layout.

Send a `DELETE` request to `/design/layouts/`. The server returns `204` on success.

**Request:**
```bash
curl -X DELETE https://localhost:8090/design/layouts/ \
  -H "Authorization: Bearer <access_token>"
```

> **Warning**
>
> You cannot delete a layout that is currently assigned to an application. Remove the layout from all applications before deleting it.


## Next Steps


  - [Themes](https://thunderid.dev/docs/next/guides/guides/themes.md) — Configure colors, typography, and visual effects for your screens.
  - [Localization](https://thunderid.dev/docs/next/guides/i18n/localization.md) — Understand how languages, namespaces, and translation resolution work.
