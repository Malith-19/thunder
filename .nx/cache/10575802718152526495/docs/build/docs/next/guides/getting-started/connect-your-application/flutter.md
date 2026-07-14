# Flutter Quickstart

# Flutter Quickstart

This is **step 4** of the getting started sequence. By the end you will have a working Flutter app with sign-in and sign-out powered by ThunderID on both iOS and Android.


## What You Will Learn

}>Create a new Flutter project
}>Install the <code>thunderid_flutter</code> package</TutorialHeroItem>
}>Add working sign-in and sign-out using Flutter widgets</TutorialHeroItem>
}>Display the signed-in user's name</TutorialHeroItem>

## Prerequisites

}>About 20 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Flutter 3.16+ and Dart 3.2+</TutorialHeroItem>
}>iOS 16+ or Android API 26+ target device or simulator</TutorialHeroItem>

</TutorialHero>

:::tip Example Source Code
Check out the complete Flutter Quickstart Sample in the ThunderID repository.
:::


## Create a Flutter App

Create a new Flutter project:

```bash
flutter create my_app
cd my_app
```

> **Note**
>
> If you already have an existing Flutter project, skip this step.


## Install `thunderid_flutter` Package

Add the package to your `pubspec.yaml`:

```yaml title="pubspec.yaml"
dependencies:
  thunderid_flutter: ^0.1.0
```

Then install it:

```bash
flutter pub get
```

## Configure a Callback URL Scheme

ThunderID redirects back to your app after sign-in and sign-out using a custom URL scheme. You need to register this scheme on both platforms.

### iOS

Open `ios/Runner/Info.plist` and add a URL scheme under **URL Types**:

```xml title="ios/Runner/Info.plist"
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>dev.thunderid.app</string>
    </array>
  </dict>
</array>
```

### Android

Open `android/app/src/main/AndroidManifest.xml` and add an intent filter inside your `<activity>` tag:

```xml title="android/app/src/main/AndroidManifest.xml"
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data
    android:scheme="dev.thunderid.app"
    android:host="callback" />
</intent-filter>
```

### Register the URIs in the console

In the ThunderID console, open the application you registered in step 2 and add the following as an **Allowed Redirect URI**:

```
dev.thunderid.app://callback
```

Add the same value as an **Allowed Post-Logout Redirect URI**:

```
dev.thunderid.app://logout
```

## Initialize the SDK

Wrap your root widget with `ThunderIDProvider` in `lib/main.dart`:

```dart title="lib/main.dart" showLineNumbers
import 'package:flutter/material.dart';
import 'package:thunderid_flutter/thunderid_flutter.dart';

void main() {
  runApp(
    ThunderIDProvider(
      config: ThunderIDConfig(
        baseUrl: 'https://localhost:8090',
        clientId: '<your-client-id>',
        scopes: const ['openid', 'profile', 'email'],
        afterSignInUrl: 'dev.thunderid.app://callback',
        afterSignOutUrl: 'dev.thunderid.app://logout',
        applicationId: '<your-application-id>',
      ),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp();

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: RootScreen(),
    );
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
| `scopes` | OAuth 2.0 scopes to request. Include `'openid'` at minimum. |
| `afterSignInUrl` | The redirect URI to return to after sign-in |
| `afterSignOutUrl` | The redirect URI to return to after sign-out |
| `applicationId` | The Application ID used for embedded (app-native) sign-in flows |

## Add Sign-In and Sign-Out

Create a root screen that reads auth state from `ThunderIDProvider.of(context)` and routes to either your auth or home screen.

Create `lib/root_screen.dart`:

```dart title="lib/root_screen.dart" showLineNumbers
import 'package:flutter/material.dart';
import 'package:thunderid_flutter/thunderid_flutter.dart';
import 'auth_screen.dart';
import 'home_screen.dart';

class RootScreen extends StatelessWidget {
  const RootScreen();

  @override
  Widget build(BuildContext context) {
    final thunder = ThunderIDProvider.of(context);

    if (!thunder.initialized || thunder.isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return thunder.isSignedIn ? const HomeScreen() : const AuthScreen();
  }
}
```

Create `lib/auth_screen.dart` to display the sign-in form:

```dart title="lib/auth_screen.dart" showLineNumbers
import 'package:flutter/material.dart';
import 'package:thunderid_flutter/thunderid_flutter.dart';

enum _AuthMode

class AuthScreen extends StatefulWidget {
  const AuthScreen();

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  _AuthMode _mode = _AuthMode.signIn;

  @override
  Widget build(BuildContext context) {
    final thunder = ThunderIDProvider.of(context);
    final applicationId = thunder.config?.applicationId ?? '';

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 40),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SegmentedButton<_AuthMode>(
                segments: const [
                  ButtonSegment(value: _AuthMode.signIn, label: Text('Sign In')),
                  ButtonSegment(value: _AuthMode.signUp, label: Text('Create Account')),
                ],
                selected: ,
                onSelectionChanged: (s) => setState(() => _mode = s.first),
              ),
              const SizedBox(height: 28),
              if (_mode == _AuthMode.signIn)
                SignIn(applicationId: applicationId)
              else
                SignUp(applicationId: applicationId),
            ],
          ),
        ),
      ),
    );
  }
}
```

## Display User Profile Information

Create `lib/home_screen.dart` to show the authenticated user's name and a sign-out button:

```dart title="lib/home_screen.dart" showLineNumbers
import 'package:flutter/material.dart';
import 'package:thunderid_flutter/thunderid_flutter.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen();

  @override
  Widget build(BuildContext context) {
    final thunder = ThunderIDProvider.of(context);
    final user = thunder.user;

    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (user != null) ...[
              Text(
                'Welcome, $!',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 8),
              Text(
                user.email ?? '',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
              ),
              const SizedBox(height: 24),
            ],
            SignOutButton(),
          ],
        ),
      ),
    );
  }
}
```

## Run the App

Start an iOS simulator or connect an Android device, then run:

```bash
flutter run
```

:::tip Success
You should see the sign-in form. Enter the test user credentials you created in step 2 and tap **Submit**. After successful authentication, the home screen displays the user's name and a **Sign Out** button.
:::


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with a Client ID
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ Flutter app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the sign-in flow
      Add MFA, passkeys, or social login to your flow, no app code changes required.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/flutter/overview" style=}>

      <div style=}>Flutter SDK Reference
      Explore the full API reference for the ThunderID Flutter SDK.
      API Reference →
    </div>
  </a>

</div>
