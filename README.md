# ClaimTrack

A responsive insurance claims dashboard for **Prairie Mutual**, built in React with a matching Figma design system.

> **Concept project.** Prairie Mutual is a fictional client created for this brief. The data comes from a mocked REST API.

**Live demo:** https://madhugiri99-svg.github.io/claimtrack/ · **Component library:** https://madhugiri99-svg.github.io/claimtrack/storybook/

## The brief

Policyholders at Prairie Mutual can't easily tell what stage their claim is in, what they still need to send, or when they'll be paid, so they call. ClaimTrack gives them a self-serve claim view that works on phone, tablet and desktop and meets WCAG 2.2 AA.

The three tasks the design is judged on:

1. Find out what stage a claim is in and what happens next
2. Find and complete a missing-document request
3. Find the payout amount and when it will arrive

## What's in this repo

| Area                                        | Where                                                  |
| ------------------------------------------- | ------------------------------------------------------ |
| Design tokens (mirrors the Figma variables) | `src/tokens/`                                          |
| React components + Storybook stories        | `src/components/`                                      |
| Mock API and typed API client               | `src/mocks/`, `src/api/` ([API contract](docs/api.md)) |
| Screens: overview, claim detail, upload     | `src/pages/`, `src/layout/`                            |
| Accessibility notes and fixes               | [docs/accessibility.md](docs/accessibility.md)         |

## Try it

- **Overview:** summary, action-needed banner, search and filter. Cards on phone/tablet, a table on desktop.
- **Claim detail:** open CLM-20481 for an active claim, or CLM-18615 for a denied claim with the reason and appeal deadline.
- **Upload:** from CLM-20481, upload the repair estimate. Try a .txt file to see validation.
- **Loading and errors:** add `?mock-slow` or `?mock-error=claims` before the `#` in the URL.

## Design ↔ code

The Figma file defines colors, spacing and radius as variables. Each variable's code syntax is the CSS variable used here; for example, `color/action/primary` in Figma is `var(--color-action-primary)` in code. Every React component has a matching Figma component with the same name.

## Running it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev          # app at http://localhost:5173/claimtrack/
npm run storybook    # component library at http://localhost:6006
```

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format`, `npm run tokens`.

Every push to `main` deploys the app and Storybook to GitHub Pages; pull requests run format, lint and build checks.

## How work is done

Every change goes through a branch and a pull request, self-reviewed before merging. Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `refactor:`).

Built with help from Claude (Anthropic) as an AI pair programmer; design decisions, reviews and usability testing are my own.
