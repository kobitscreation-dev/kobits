# Run real Kobits agents

The current front end can now call `POST /api/run-agent`, which is a Netlify Function. The API key stays on Netlify and is never placed in the browser or in this repository.

## Private test only

1. Put this repository on GitHub, then import it into Netlify. Netlify Drop only publishes static files and will not deploy the `netlify/functions` backend.
2. In Netlify, open **Project configuration → Environment variables**.
3. Add `OPENAI_API_KEY` with your provider key. Scope it to **Functions** when that option is available.
4. Add `KOBITS_ALLOW_UNAUTHENTICATED_DEMO` with the value `true` only for a private test URL. This lets the site call the agent function without sign-in.
5. Optional: add `KOBITS_MODEL` to choose the model your account supports. The function otherwise uses `gpt-4.1-mini`.
6. Deploy again. Place an order and the delivery will come from the server function, not the local demo preview.

## Before public launch

Do **not** leave `KOBITS_ALLOW_UNAUTHENTICATED_DEMO=true` on a public site. Add real user authentication, per-user rate limits, payments, and a database first. Then change the function so it verifies the signed-in user before calling the AI provider.

## Gmail and Slack

Gmail and Slack require separate OAuth applications, redirect URLs, encrypted token storage, and user consent. They are not enabled by simply adding an API key. Build them after the order execution path and authentication are working.
