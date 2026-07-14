# Skills

export const SkillCard = () => (

    <CardContent sx=}}>
      <Box sx=}>
        <Box sx=}>



          <Box sx=}>
            <Typography variant="subtitle2" sx=}>


            {pkg && (



            )}
          </Box>



        </Box>




      </Box>
    </CardContent>
  </Card>
);

# Skills

ThunderID agent skills let AI coding assistants set up the ThunderID server and integrate authentication into your application automatically. You describe what you want in plain language and the agent runs the skill to handle the configuration, file edits, and code generation.

Skills are available for [Claude Code](https://claude.ai/code), [Codex](https://openai.com/index/openai-codex/), and any assistant that supports [Open Agent Skills](https://openagentskills.dev).

## Install

Add the ThunderID skill pack to your AI coding assistant once. All skills in the pack become immediately available.




        Open Agent Skills CLI

    }
    default
  >

Run the following command in your terminal:

```bash
npx skills add thunder-id/skills
```




        Claude Code

    }
  >

Run the following slash command in Claude Code:

```
/plugin marketplace add thunder-id/skills
```





        Codex

    }
  >

Run the following command in your terminal, then restart Codex:

```bash
codex plugin marketplace add thunder-id/skills
```

After restarting, open **`/plugins`**, select **ThunderID Skills**, install and enable `thunder-id-skills`, then start a new thread.





## Core Skills


  <Grid size=}>
    }
      title="Setup ThunderID"
      skillCommand="/setup-thunderid"
      description="Download, configure, and start the ThunderID server. Supports npx (recommended) and Docker Compose. Outputs the Sample App Client ID you need for SDK integration."
    />

</Grid>

## Integration Skills

Choose the skill that matches your framework. Each skill registers an application in the ThunderID Console, installs the correct SDK, and wires up authentication in your project.

### Frontend


  <Grid size=}>
    }
      title="React"
      skillCommand="/integrate-react"
      pkg="@thunderid/react"
      description="Add authentication to a React + Vite app. For React Router or TanStack Router projects, use the dedicated router skills instead."
    />


    }
      title="Next.js"
      skillCommand="/integrate-nextjs"
      pkg="@thunderid/nextjs"
      description="Integrate authentication into a Next.js App Router application with server-side session management and route protection middleware."
    />


    }
      title="Nuxt"
      skillCommand="/integrate-nuxt"
      pkg="@thunderid/nuxt"
      description="Add authentication to a Nuxt 3 application using the official ThunderID Nuxt module."
    />


    }
      title="Vue"
      skillCommand="/integrate-vue"
      pkg="@thunderid/vue"
      description="Integrate authentication into a Vue 3 application with composables for session access and route guards."
    />


    }
      title="React + React Router"
      skillCommand="/integrate-react-router"
      pkg="@thunderid/react-router"
      description="Protect routes and handle OAuth callbacks in a React Router v6 application."
    />


    }
      title="React + TanStack Router"
      skillCommand="/integrate-tanstack-router"
      pkg="@thunderid/tanstack-router"
      description="Protect routes and handle OAuth callbacks in a TanStack Router application."
    />


    }
      title="Browser / Vanilla JS"
      skillCommand="/integrate-browser"
      pkg="@thunderid/browser"
      description="Add authentication to a plain HTML and JavaScript app with no framework — ideal for simple SPAs or prototype projects."
    />

</Grid>

### Backend


  <Grid size=}>
    }
      title="Express"
      skillCommand="/integrate-express"
      pkg="@thunderid/express"
      description="Protect routes in an Express application with session-based authentication middleware and callback handling."
    />


    }
      title="Node.js"
      skillCommand="/integrate-node"
      pkg="@thunderid/node"
      description="Add authentication to a Node.js server built with Fastify, Hono, Koa, or the built-in HTTP module. For Express, use the Express skill."
    />


    }
      title="Universal JavaScript"
      skillCommand="/integrate-javascript"
      pkg="@thunderid/javascript"
      description="Use the core JavaScript SDK directly for custom integrations, edge runtimes, or any environment without a dedicated ThunderID SDK."
    />

</Grid>

### Other Frameworks and Languages


  <Grid size=}>
    }
      title="Generic OIDC"
      skillCommand="/integrate-oidc"
      description="Integrate ThunderID via a standard OIDC library for any framework or language without an official SDK — Angular, SvelteKit, Python, Go, .NET, and more."
    />

</Grid>

## How to Use Skills

Type a plain-language request in your AI assistant's chat. The assistant detects the intent, selects the matching skill, and runs it.

| You Say | Skill |
|---|---|
| "Set up ThunderID on my machine" | `/setup-thunderid` |
| "Add ThunderID to my Next.js app" | `/integrate-nextjs` |
| "Add ThunderID to my Nuxt app" | `/integrate-nuxt` |
| "Integrate ThunderID into my React app" | `/integrate-react` |
| "Add ThunderID to my React Router app" | `/integrate-react-router` |
| "Add ThunderID to my TanStack Router app" | `/integrate-tanstack-router` |
| "Add ThunderID to my Vue app" | `/integrate-vue` |
| "Protect routes in my Express app" | `/integrate-express` |
| "Add ThunderID to my Fastify / Hono app" | `/integrate-node` |
| "Add ThunderID to my vanilla JS app" | `/integrate-browser` |
| "Integrate ThunderID without a framework" | `/integrate-javascript` |
| "Add ThunderID to my Angular / SvelteKit / Python / Go app" | `/integrate-oidc` |

You can also invoke skills directly by name. In Claude Code, type `/integrate-nextjs`. In Codex, type `/integrate-nextjs` in a thread. Both assistants run the skill immediately without further prompting.


:::tip Run Setup First
If ThunderID is not running yet, ask your assistant to "set up ThunderID" before running an integration skill. The setup skill outputs the Sample App **Client ID** that the integration skills need to configure your application.
:::
