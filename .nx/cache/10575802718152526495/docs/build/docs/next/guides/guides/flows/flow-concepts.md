# Flow Concepts

# Flow Concepts

This page explains the core building blocks of the Flow Builder in the ThunderID Console. Understanding these concepts will help you design and configure flows confidently.

## Node Types

Every flow graph on the canvas contains four types of nodes.


### START

The **START** node marks the entry point of every flow. Each flow has exactly one START node. It appears automatically when you open a new flow and cannot be deleted.

### PROMPT

A **PROMPT** node renders a screen to the user. It presents form fields, buttons, and other UI elements defined by its prompts. The flow pauses at a PROMPT node until the user fills the required inputs and selects an action to advance.

For advanced configuration options and detailed reference, see [Prompt Node](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md#prompt-node).

### TASK EXECUTION

A **TASK EXECUTION** node runs a backend executor without displaying any UI. Examples include verifying credentials, sending a one-time password (OTP), or provisioning a new user account.

After a TASK EXECUTION node runs, it takes one of three paths:

- The **success path** leads to the next node when the executor completes successfully.
- The **failure path** forwards to a handler node, typically a PROMPT showing an error message, when the executor reports a failure.
- The **incomplete path** forwards to a PROMPT node when the executor needs additional user input before it can complete. For example, if a user's profile is missing required attributes, the executor returns an incomplete status and the flow routes the user back to a prompt screen to collect the missing data.

For advanced configuration options and detailed reference, see [Task Execution Node](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md#task-execution-node).

### END

The **END** node marks a successful completion of the flow. When the flow reaches an END node, ThunderID issues an assertion confirming the user authenticated or registered successfully. A flow can have multiple END nodes if different paths each lead to a valid completion.

## Building Blocks

The following are the building blocks you can add to the canvas from the left panel to construct your flow.


### Widgets

Widgets are pre-built, reusable flow segments that combine a PROMPT node and one or more TASK EXECUTION nodes. Instead of adding and wiring individual nodes, you add a Widget and get a complete block that covers an entire authentication step.

For the complete list of available widgets and their configuration, see [Widgets](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md#widgets).

### Steps

Steps are individual PROMPT nodes. Unlike Widgets, a Step provides only the UI screen. You wire it to TASK EXECUTION nodes yourself. Use Steps when you need a custom combination not covered by a Widget.

For the complete list of available steps and their configuration, see [Steps](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md#steps).

### Components

Components are the individual UI elements inside a PROMPT node. Add them to a blank PROMPT to design a custom screen, or add them to an existing Step to extend it.

For the complete list of available components and their configuration, see [Components](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md#components).

### Executors

Executors are the backend operations that power TASK EXECUTION nodes. Add a TASK EXECUTION node to the canvas and assign an Executor to it. Each Executor performs one specific operation.

For the complete list of available executors and their configuration, see [Executors](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md#executors).

## Flow Builder

The Flow Builder is the visual tool for building flows in ThunderID. It opens when you create or edit a flow and presents two areas: the **canvas** and the **left panel**.

### Canvas

The canvas is where you assemble the flow graph. Use the controls below to navigate and manage the layout:

- **Zoom and pan** — scroll or pinch to zoom; drag to pan across large flows.
- **Auto-layout** — rearranges all nodes for readability (flow settings menu).
- **Fit view** — resize the flow to fit the view.
- **Edge style change** — change the edge display style within the flow builder.

### Left Panel

The left panel gives you access to the building blocks described above — Widgets, Steps, Components, and Executors. Drag any item from the panel onto the canvas to add it to the flow.

> **Tip**
>
> Click the <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style=}><path d="M11 10.27 7 3.34"></path><path d="m11 13.73-4 6.93"></path><path d="M12 22v-2"></path><path d="M12 2v2"></path><path d="M14 12h8"></path><path d="m17 20.66-1-1.73"></path><path d="m17 3.34-1 1.73"></path><path d="M2 12h2"></path><path d="m20.66 17-1.73-1"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m3.34 7 1.73 1"></path><circle cx="12" cy="12" r="2"></circle><circle cx="12" cy="12" r="8"></circle></svg> configure icon on an executor node to open and edit its properties.


### Node Connections

| Connection | Valid | Notes |
|--------|-------|------|
| PROMPT → TASK EXECUTION | Yes | Triggered when the user submits the form in the PROMPT node |
| TASK EXECUTION (success) → PROMPT or TASK EXECUTION | Yes | Continues the flow on success |
| TASK EXECUTION (failure) → PROMPT | Yes | Routes to an error screen or retry step |
| TASK EXECUTION (incomplete) → PROMPT | Yes | Routes back to collect more input; target must be a PROMPT node. Only executors that can request additional input expose this path (e.g. Attribute Collector, Provisioning, OU Creation) |
| TASK EXECUTION (success) → END | Yes | Completes the flow |
| START → TASK EXECUTION | Yes | For background executors that require no initial user input |
| END → anything | No | END has no outputs |

> **Note**
>
> Always connect both the success and failure ports on every TASK EXECUTION node. An unconnected failure port causes the flow to end with an error and no feedback to the user.


See [View and Executor Pairings](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md#view-and-executor-pairings) for guidance on pairing PROMPT nodes with the correct executors.

## Interceptors

A flow definition can declare an optional `interceptors` array to attach cross-cutting operations that run at defined lifecycle points (before or after a request, or around individual nodes). Interceptors are declared at the flow level and apply across nodes based on their mode and scope.

For the full field reference and lifecycle details, see [Interceptors](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md#interceptors).

## Flow Versioning

Every time you save a flow, ThunderID creates a new version. The version number appears in the **Version** column on the Flows list page. You can view version history and restore any earlier version via API. See [Flow Versioning API Reference](https://thunderid.dev/docs/next/apis.md#tag/flow-versioning).

## What's Next

- Start building — Follow a step-by-step walkthrough in [Build a Flow](https://thunderid.dev/docs/next/guides/guides/build-a-flow.md).

## Related Guides

- [Advanced Configurations](https://thunderid.dev/docs/next/guides/guides/advanced-configurations.md) - Complete list of all Widgets, Steps, Components, and Executors.
