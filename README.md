# ClaimTrack

A responsive insurance claims dashboard for **Prairie Mutual**, built in React with a matching Figma design system.

> **Concept project.** Prairie Mutual is a fictional client created for this brief. The data comes from a mocked REST API.

## The brief

Policyholders at Prairie Mutual can't easily tell what stage their claim is in, what they still need to send, or when they'll be paid, so they call. ClaimTrack gives them a self-serve claim view that works on phone, tablet and desktop and meets WCAG 2.2 AA.

The three tasks the design is judged on:

1. Find out what stage a claim is in and what happens next
2. Find and complete a missing-document request
3. Find the payout amount and when it will arrive

## What's in this repo

| Area                                        | Where                    |
| ------------------------------------------- | ------------------------ |
| Design tokens (mirrors the Figma variables) | `src/tokens/`            |
| React components + Storybook stories        | `src/components/`        |
| Mock API (coming in a later PR)             | `src/mocks/`, `src/api/` |
| Screens (coming in a later PR)              | `src/pages/`             |
| Accessibility notes and test findings       | `docs/`                  |

## Design ↔ code

The Figma file defines colors, spacing and radius as variables. Each variable's code syntax is the CSS variable used here; for example, `color/action/primary` in Figma is `var(--color-action-primary)` in code. Every React component has a matching Figma component with the same name.

## Running it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev          # app at http://localhost:5173/claimtrack/
npm run storybook    # component library at http://localhost:6006
```

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format`.

## How work is done

Every change goes through a branch and a pull request, self-reviewed before merging. Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `refactor:`).

Built with help from Claude (Anthropic) as an AI pair programmer; design decisions, reviews and usability testing are my own.
