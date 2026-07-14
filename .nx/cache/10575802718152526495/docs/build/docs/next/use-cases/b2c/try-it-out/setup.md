# Set Up Sample Application

# Set Up Sample Application

This page walks you through the quick path: download the sample, import a pre-built bundle into ThunderID, and run the app. Everything the walkthroughs need is created in one step.

:::tip Prefer to build the setup manually?
Skip the bundle import and follow [Configure It Yourself](https://thunderid.dev/docs/next/use-cases/b2c/configure-it-yourself.md) instead. It creates the same resources step by step through the console and API.
:::

## Set Up Your Environment


### Run ThunderID

Get ThunderID running locally. Follow [Get ThunderID](https://thunderid.dev/docs/next/guides/getting-started/get-thunderid.md) for download, setup, and start commands.

### Configure the Server

Edit `deployment.yaml` and add the Wayfinder origin under `cors.allowed_origins`. Leave any existing entries in place.

```yaml
cors:
  allowed_origins:
    # ...existing entries...
    - "http://localhost:5173"
```

Restart ThunderID after the change.

### Get the Wayfinder Sample

Download the latest Wayfinder sample distribution. It ships with a `thunderid-config/` directory containing a declarative YAML bundle and a `thunderid.env` file with the environment variables it references.


### Import the Sample Bundle

Apply the bundle through the ThunderID Console. It creates everything the walkthroughs share.

1. Sign in to the ThunderID Console at https://localhost:8090/console.
2. On first sign-in, a welcome screen appears with an **Open** button. (Later, reach the same screen from the user profile menu in the top-right corner of the Console.)
3. Click **Open** and select your `thunderid-config/thunderid-config.yaml` file from the sample distribution.
4. Select your `thunderid-config/thunderid.env` file to provide the environment variables referenced in the YAML.
5. The Console imports the files and reports the resources it created when the import completes.

### Run the Sample

From the extracted sample directory, install dependencies:

```bash
npm install
```

Then start all services:

```bash
npm run dev
```

The sample opens at http://localhost:5173.


## Walkthroughs

Pick a walkthrough to begin. Each one starts from the setup above.


  - [Login](https://thunderid.dev/docs/next/use-cases/b2c/add-login.md) — John Doe signs in to Wayfinder and arrives at the dashboard.
  - [Self Sign-Up](https://thunderid.dev/docs/next/use-cases/b2c/self-sign-up.md) — Emma Wilson signs up with email and password.
  - [View Profile](https://thunderid.dev/docs/next/use-cases/b2c/profile-section.md) — John views and updates his profile.
  - [Account Recovery](https://thunderid.dev/docs/next/use-cases/b2c/account-recovery.md) — John resets a forgotten password through an email link.
  - [Onboard Internal Users](https://thunderid.dev/docs/next/use-cases/b2c/onboard-internal-users.md) — Alex invites staff members from the console.


## Going Deeper

- Curious how the bundle maps to ThunderID concepts? See [Identity Concepts](https://thunderid.dev/docs/next/use-cases/identity-concepts.md).
