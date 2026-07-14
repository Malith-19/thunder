# MCP Server

# ThunderID MCP Server

ThunderID provides a Model Context Protocol (MCP) server that enables AI assistants and development tools to interact with ThunderID's identity management capabilities. The MCP server exposes tools for managing applications, authentication flows, and React SDK integration.

## Overview

The MCP server is available at the `/mcp` endpoint on your ThunderID instance (default: `https://localhost:8090/mcp`). See [Available Tools](#available-tools) for the complete list of capabilities.

### Authentication

The MCP endpoint is secured with OAuth 2.0 Bearer Token authentication following the [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization). Clients must present a valid JWT access token with the `system` scope. ThunderID validates the token signature, issuer, audience (set to the MCP server URL), and expiry. See [Add MCP Server to VS Code](#add-mcp-server-to-vs-code) for setup instructions.

## Available Tools

### Application Tools

| Tool Name | Description | Parameters |
|---|---|---|
| `thunderid_list_applications` | List all registered applications. | None |
| `thunderid_get_application_by_id` | Retrieve full details of an application by ID including OAuth settings, customizations, and flow associations. | `id` (string, required) |
| `thunderid_get_application_by_client_id` | Retrieve full details of an application by `client_id` including OAuth settings, customizations, and flow associations. | `client_id` (string, required) |
| `thunderid_create_application` | Create a new application optionally with OAuth configuration. Use `thunderid_get_application_templates` to get pre-configured minimal templates for common app types (SPA, Mobile, Server, M2M). Use `thunderid_list_themes` to pick a theme before creating the application (skip for M2M — no login page). | Application object (see schema) |
| `thunderid_update_application` | Update an existing application (full replacement). Provide the complete application object. | Application object with `id` (required) |
| `thunderid_get_application_templates` | Get minimal OAuth configuration templates for common application types (SPA, Mobile, Server, M2M). SPA, Mobile, and Server templates include a `themeId` field — call `thunderid_list_themes` first and replace the placeholder. M2M templates do not include `themeId`. | None |

### Flow Tools

| Tool Name | Description | Parameters |
|---|---|---|
| `thunderid_list_flows` | List available flows with optional filtering. | `limit` (int, default: 30), `offset` (int, default: 0), `flow_type` (`enum`: `AUTHENTICATION`, `REGISTRATION`) |
| `thunderid_get_flow_by_handle` | Retrieve a complete flow definition by its human-readable handle. | `handle` (string, required), `flow_type` (`enum`, required) |
| `thunderid_get_flow_by_id` | Retrieve a complete flow definition by its unique ID (UUID). | `id` (string, required) |
| `thunderid_create_flow` | Create a new authentication or registration flow. | Flow definition object (see schema) |
| `thunderid_update_flow` | Update an existing flow definition. | `id` (string, required), `name` (string, required), `nodes` (array, required) |

### Theme Tools

| Tool Name | Description | Parameters |
|---|---|---|
| `thunderid_list_themes` | List all themes with summary information (ID, handle, display name). Use before creating an application to pick a theme. | None |
| `thunderid_get_theme_by_id` | Retrieve full details of a theme by ID including color schemes and typography configuration. | `id` (string, required) |

### Organization Unit Tools

| Tool Name | Description | Parameters |
|---|---|---|
| `thunderid_list_organization_units` | List all organization units. | None |

### User Type Tools

| Tool Name | Description | Parameters |
|---|---|---|
| `thunderid_list_user_types` | List all user types including self-registration settings. | None |

### React SDK Tools

| Tool Name | Description | Parameters |
|---|---|---|
| `thunderid_integrate_react_sdk` | Provides instructions and code snippets for integrating ThunderID authentication and signup via the ThunderID React SDK. Supports redirect-based login (Mode 1), self-hosted login (Mode 2), and app-native signup flows. | `thunderid_url` (string, optional) |

## Getting Started

To connect an MCP client to the ThunderID MCP server, see [Getting Started with MCP](https://thunderid.dev/docs/next/guides/working-with-ai/get-started-with-mcp.md).

## Related Documentation

- [API Reference](https://thunderid.dev/docs/next/apis.md) - Application and Flow Management REST APIs
- [React SDK](https://thunderid.dev/docs/next/sdks/react/overview.md) - ThunderID React SDK documentation
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) - MCP auth protocol details
