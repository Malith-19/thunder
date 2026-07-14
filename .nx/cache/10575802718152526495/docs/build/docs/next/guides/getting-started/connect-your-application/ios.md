# iOS Quickstart

# iOS Quickstart

This is **step 4** of the getting started sequence. By the end you will have a working iOS app with sign-in and sign-out powered by ThunderID.


## What You Will Learn

}>Create a new Xcode project
}>Install the <code>ThunderIDSwiftUI</code> Swift package</TutorialHeroItem>
}>Add working sign-in and sign-out using SwiftUI components</TutorialHeroItem>
}>Display the signed-in user's name</TutorialHeroItem>

## Prerequisites

}>About 15 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Xcode 15 or later</TutorialHeroItem>
}>iOS 16+ deployment target</TutorialHeroItem>

</TutorialHero>

:::tip Example Source Code
Check out the complete iOS Quickstart Sample in the ThunderID repository.
:::


## Create an iOS App

In Xcode, create a new project using the **iOS > App** template. Choose **SwiftUI** as the interface and **Swift** as the language.

> **Note**
>
> If you already have an existing iOS project, skip this step.


## Install ThunderIDSwiftUI

In Xcode, go to **File > Add Package Dependencies** and enter the package URL:

```
https://github.com/thunderid/thunderid-ios-sdk
```

When prompted to choose package products, select **ThunderIDSwiftUI**. This includes the core `ThunderID` client as a dependency.

> **Note**
>
> If you manage dependencies with CocoaPods, add the following to your `Podfile` instead:
>
> ```ruby
> pod 'ThunderIDSwiftUI'
> ```


## Configure a Callback URL Scheme

ThunderID redirects back to your app after sign-in and sign-out using a custom URL scheme. You need to register this scheme in two places.

**1. Register the scheme in your app**

Open your app's `Info.plist` and add a URL scheme under **URL Types**. For example:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>io.thunderid.b2c</string>
    </array>
  </dict>
</array>
```

**2. Register the redirect URI in the ThunderID console**

In the console, open the application you registered in step 2 and add the following as an **Allowed Redirect URI**:

```
io.thunderid.b2c://callback
```

Add the same value as an **Allowed Post-Logout Redirect URI**:

```
io.thunderid.b2c://logout
```

## Initialize the SDK

Open your app's entry point (the file that conforms to `App`) and apply the `.thunderIDProvider(config:)` modifier to your root view. This injects a `ThunderIDState` environment object into all child views.

```swift title="MyApp.swift" showLineNumbers
import SwiftUI
import ThunderIDSwiftUI

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .thunderIDProvider(config: ThunderIDConfig(
                    baseUrl: "https://localhost:8090",
                    clientId: "<your-client-id>",
                    scopes: ["openid", "profile", "email"],
                    afterSignInUrl: "io.thunderid.b2c://callback",
                    afterSignOutUrl: "io.thunderid.b2c://logout",
                    applicationId: "<your-application-id>"
                ))
        }
    }
}
```

:::warning Configuration
Replace `<your-client-id>` with the **Client ID** and `<your-application-id>` with the **Application ID** from your ThunderID application settings.
:::

### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `baseUrl` | Your ThunderID instance URL. Must use HTTPS. |
| `clientId` | The Client ID from your ThunderID application |
| `scopes` | OAuth 2.0 scopes to request. Include `"openid"` at minimum. |
| `afterSignInUrl` | The redirect URI to return to after sign-in |
| `afterSignOutUrl` | The redirect URI to return to after sign-out |
| `applicationId` | The Application ID used for embedded (app-native) sign-in flows |

## Add Sign-In and Sign-Out

The ThunderID iOS SDK provides `SignedIn` and `SignedOut` guard views for conditional rendering, a `SignIn` component for the embedded sign-in flow, and a `SignOutButton` for sign-out.

Replace the contents of `ContentView.swift` with:

```swift title="ContentView.swift" showLineNumbers
import SwiftUI
import ThunderIDSwiftUI

struct ContentView: View {
    @EnvironmentObject var state: ThunderIDState

    var body: some View {
        Group {
            if !state.isInitialized {
                ProgressView("Loading...")
            } else {
                SignedIn {
                    HomeView()
                } fallback: {
                    AuthView()
                }
            }
        }
    }
}
```

Create `AuthView.swift` to display the sign-in form:

```swift title="AuthView.swift" showLineNumbers
import SwiftUI
import ThunderIDSwiftUI

struct AuthView: View {
    var body: some View {
        VStack(spacing: 24) {
            Text("Welcome")
                .font(.largeTitle)
                .bold()

            SignIn(applicationId: "<your-application-id>")
                .padding()
        }
        .padding()
    }
}
```

## Display User Profile Information

Create `HomeView.swift` to show the authenticated user's name and a sign-out button:

```swift title="HomeView.swift" showLineNumbers
import SwiftUI
import ThunderIDSwiftUI

struct HomeView: View {
    @EnvironmentObject var state: ThunderIDState

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                if let user = state.user {
                    Text("Welcome, \(user.displayName ?? user.email ?? "User")!")
                        .font(.title2)
                        .bold()

                    Text(user.email ?? "")
                        .foregroundStyle(.secondary)
                }

                SignOutButton()
                    .buttonStyle(.borderedProminent)
            }
            .padding()
            .navigationTitle("Home")
        }
    }
}
```

## Run the App

In Xcode, select an iOS 16+ simulator and press **Run** (⌘R).

:::tip Success
You should see the sign-in form. Enter the test user credentials you created in step 2 and tap **Submit**. After successful authentication, the home screen displays the user's name and a **Sign Out** button.
:::


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with a Client ID
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ iOS app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the sign-in flow
      Add MFA, passkeys, or social login to your flow, no app code changes required.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/ios/overview" style=}>

      <div style=}>iOS SDK Reference
      Explore the full API reference for the ThunderID iOS SDK.
      API Reference →
    </div>
  </a>

</div>
