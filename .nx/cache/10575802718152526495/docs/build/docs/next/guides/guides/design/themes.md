# Themes

# Themes

A theme defines the visual styling for your application's authentication screens. Create custom themes to match your brand identity or use the default theme that ships with ThunderID.

## Theme Properties

Each theme includes the following configurable properties. For detailed property references, see [Design Catalog](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#theme-properties).

| Property | Description |
|----------|-------------|
| **Color Schemes** | Light and dark color palettes covering primary, secondary, semantic, background, and text colors. See [Color Schemes](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#color-schemes). |
| **Shape** | Corner radius for cards, buttons, and inputs. See [Shape](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#shape). |
| **Blur Effects** | Frosted glass (acrylic) backgrounds at multiple intensity levels. See [Blur Effects](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#blur-effects). |
| **Gradients** | CSS gradients for primary and secondary surfaces. See [Gradients](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#gradients). |
| **Typography** | Font family selection with support for browser-safe and Google Fonts. See [Typography](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#typography). |
| **Text Direction** | Left-to-right or right-to-left text rendering. See [Text Direction](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#text-direction). |
| **Component Overrides** | CSS-in-JS styling for individual UI components such as buttons, text fields, and dialog boxes. See [Component Overrides](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#component-overrides). |

ThunderID ships with a default theme. For details, see [Default Theme](https://thunderid.dev/docs/next/guides/guides/design-catalog.md#default-theme).

## Create a Theme


### Open the Theme Builder

1. Sign in to the ThunderID Console.
2. Navigate to **Design** from the sidebar.
3. In the **Themes** section, click **Add Theme**.

### Enter a Theme Name

Enter a name for your theme. Pick one of the suggested names or type a custom name.

Click **Continue** to proceed.

### Select a Primary Color

Select one of the preset colors (Indigo, Blue, Cyan, Teal, Green, Orange, Red, Pink, Purple, or Slate) or use the color picker to set a custom primary color.

The live preview on the right shows how the selected color appears on the sign-in screen.

Click **Create Theme** to generate the theme and open the theme builder.

### Customize the Theme

The theme builder opens with a live preview in the center. Use the left panel to configure:

- **Colors**: Adjust light and dark color palettes.
- **Shape**: Set the border radius for UI elements.
- **Typography**: Choose a font family and configure font weights.
- **Default Color Scheme**: Select **Light**, **Dark**, or **System**.
- **Default Text Direction**: Select **Left-to-Right** or **Right-to-Left**.

Click **Save** to apply your changes.

### Assign the Theme to an Application

Open your application in the ThunderID Console, navigate to **Customization** settings, and select your theme.


## Update a Theme

1. Navigate to **Design** in the ThunderID Console and click the theme you want to edit. The theme builder opens with a live preview.
2. Use the left panel to edit **Colors**, **Shape**, **Typography**, **Default Color Scheme**, and **Default Text Direction**.
3. Click **Save** to apply your changes. To discard unsaved changes, click **Revert**.

Changes take effect immediately for new authentication sessions.

## Delete a Theme

1. Navigate to **Design** in the ThunderID Console.
2. Click the theme you want to delete to open the theme builder.
3. Click the **Delete** button in the top-right corner and confirm the deletion.

> **Warning**
>
> You cannot delete a theme that is currently assigned to an application. Remove the theme from all applications before deleting it.


## Next Steps


  - [Layouts](https://thunderid.dev/docs/next/guides/guides/layouts.md) — Configure screen structure, sections, and custom stylesheets for your screens.
  - [Localization](https://thunderid.dev/docs/next/guides/i18n/localization.md) — Understand how languages, namespaces, and translation resolution work.
