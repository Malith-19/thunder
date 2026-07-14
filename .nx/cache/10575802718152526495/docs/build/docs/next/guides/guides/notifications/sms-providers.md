# Configure an SMS Provider

# Configure an SMS Provider

ThunderID sends SMS messages — such as One-Time Passwords (OTPs) — through a notification sender. A notification sender connects ThunderID to a messaging provider that delivers SMS to end users.

Three messaging providers are supported:

- **Twilio** — requires an Account SID, Auth Token, and Sender ID
- **Vonage** — requires an API Key, API Secret, and Sender ID
- **Custom** — connects to any SMS gateway via an HTTP webhook

## Prerequisites

- A ThunderID instance running and accessible
- An active account with your chosen messaging provider

## Add an SMS Provider

### Twilio

1. Log in to [Twilio](https://www.twilio.com) and retrieve your **Account SID**, **Auth Token**, and the phone number or messaging service SID to use as the sender.

2. Send a `POST` request to the notification sender API:

```bash
curl -X POST https://localhost:8090/notification-senders/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "TwilioSMSSender",
    "provider": "twilio",
    "description": "Twilio SMS provider for OTP delivery",
    "properties": [
      ,
      ,
      ,

    ]
  }'
```

#### Twilio Properties

| Property | Required | Secret | Description |
| :--- | :---: | :---: | :--- |
| `account_sid` | ✅ | ❌ | Twilio Account SID. Must start with `AC`. |
| `auth_token` | ✅ | ✅ | Twilio Auth Token used to authenticate API requests. |
| `sender_id` | ✅ | ❌ | The Twilio phone number or messaging service SID used as the sender. |
| `supported_channels` | ❌ | ❌ | The communication channels supported by this sender. Defaults to `sms`. |

---

### Vonage

1. Log in to the [Vonage API Dashboard](https://dashboard.nexmo.com) and retrieve your **API Key**, **API Secret**, and sender name or virtual number.

2. Send a `POST` request to the notification sender API:

```bash
curl -X POST https://localhost:8090/notification-senders/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "VonageSMSSender",
    "provider": "vonage",
    "description": "Vonage SMS provider for OTP delivery",
    "properties": [
      ,
      ,
      ,

    ]
  }'
```

#### Vonage Properties

| Property | Required | Secret | Description |
| :--- | :---: | :---: | :--- |
| `api_key` | ✅ | ❌ | Vonage API Key from the API Dashboard. |
| `api_secret` | ✅ | ✅ | Vonage API Secret used to authenticate API requests. |
| `sender_id` | ✅ | ❌ | Sender name or virtual number displayed to recipients. |
| `supported_channels` | ❌ | ❌ | The communication channels supported by this sender. Defaults to `sms`. |

> **Note**
>
> Vonage requires the recipient phone number in E.164 format without a leading `+` or `00`. ThunderID strips these prefixes automatically before sending.


---

### Custom Provider

Use the custom provider to connect ThunderID to any SMS gateway that accepts HTTP requests.

```bash
curl -X POST https://localhost:8090/notification-senders/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "CustomSMSSender",
    "provider": "custom",
    "description": "Custom HTTP webhook for SMS delivery",
    "properties": [
      ,
      ,
      ,
      ,

    ]
  }'
```

#### Custom Provider Properties

| Property | Required | Secret | Description |
| :--- | :---: | :---: | :--- |
| `url` | ✅ | ❌ | Full URL of the SMS gateway endpoint. |
| `http_method` | ✅ | ❌ | HTTP method to use. Supported values: `POST`, `PUT`. |
| `content_type` | ✅ | ❌ | Request body format. Supported values: `JSON`, `FORM`. |
| `http_headers` | ❌ | ✅ | Comma-separated list of additional HTTP headers in `Key: Value` format. |
| `supported_channels` | ❌ | ❌ | The communication channels supported by this sender. Defaults to `sms`. |

## Update an SMS Provider

To update an existing sender, send a `PUT` request with the sender's ID:

```bash
curl -X PUT https://localhost:8090/notification-senders/message/<sender-id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "TwilioSMSSender",
    "provider": "twilio",
    "properties": [
      ,
      ,
      ,

    ]
  }'
```

> **Note**
>
> A notification sender's `provider` cannot be changed after creation. To switch providers, delete the existing sender and create a new one.


## List and Remove SMS Providers

**List all SMS providers:**

```bash
curl https://localhost:8090/notification-senders/message \
  -H "Authorization: Bearer <access_token>"
```

**Delete an SMS provider:**

```bash
curl -X DELETE https://localhost:8090/notification-senders/message/<sender-id> \
  -H "Authorization: Bearer <access_token>"
```

## Next Steps

- [Build a Flow](https://thunderid.dev/docs/next/guides/flows/build-a-flow.md) — Add an SMS OTP step to a sign-in or registration flow
