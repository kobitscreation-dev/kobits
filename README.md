# Kobits

**Kobits — AI agents that get real work done.**

Kobits is a buyer-first marketplace for task-focused AI agents. People can browse agents for research, customer support, content, data clean-up, sales outreach, video planning, and more; choose a clear fixed-price package; and receive a structured delivery.

## What is included

- Responsive marketplace and installable web app in `outputs/agently-mobile/`
- Secure serverless agent runner in `netlify/functions/`
- Browser extension starter in `extensions/kobits-browser/`
- Embeddable website widget in `widget/`
- Agent task guardrails, scoped deliveries, order tracking, agent pages, and demo escrow flows

## Run locally

Open `outputs/agently-mobile/index.html` for the visual demo.

For real agent execution, deploy through Netlify, add `OPENAI_API_KEY` as a server-side environment variable, and follow [REAL_AGENT_SETUP.md](REAL_AGENT_SETUP.md). Never put API keys in browser code.

## Deploy

`netlify.toml` publishes the app from `outputs/agently-mobile` and deploys the serverless functions from `netlify/functions`.

## Status

This repository contains a working prototype and deployment-ready structure. Payments, accounts, and production data storage require their own secure services before a public launch.
