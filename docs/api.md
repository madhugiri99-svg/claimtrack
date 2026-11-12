# ClaimTrack API contract

The front end talks to a REST API. For this concept project the API is served in the browser by [Mock Service Worker](https://mswjs.io/) (`src/mocks/`), which intercepts real `fetch` requests. The app code (`src/api/`) is the same as it would be against a live backend; switching means changing `API_BASE` in `src/api/client.ts`.

## Endpoints

| Method | Path                           | Returns                                                                     | Errors        |
| ------ | ------------------------------ | --------------------------------------------------------------------------- | ------------- |
| GET    | `/api/summary`                 | `AccountSummary`: open claims, actions needed, paid this year, next payment | 500           |
| GET    | `/api/claims?status=&q=&sort=` | `ClaimSummary[]` for the overview list                                      | 500           |
| GET    | `/api/claims/:id`              | `Claim` with timeline, documents, payout and adjuster                       | 404, 500      |
| POST   | `/api/claims/:id/documents`    | `{ document }`, the updated document                                        | 404, 422, 500 |

Query parameters for `GET /api/claims`:

- `status`: `approved`, `pending`, `denied`, `review` or `all`
- `q`: matches claim ID, title, type or adjuster name
- `sort`: `newest` (default) or `oldest`, by filed date

`POST /api/claims/:id/documents` takes `multipart/form-data` with `documentId` and `file`. Files must be PDF, JPG or PNG and 10 MB or smaller; otherwise the API returns 422 with a message the UI shows as-is.

Errors always have the shape `{ "error": "code", "message": "Human-readable text" }`.

Denied claims include a `decision` object with the reason, the policy section, and the appeal deadline, so the UI can explain what happened and what the customer can do next.

Types live in `src/api/types.ts`.

## Demo switches

Add these to the page URL to show loading and error states (useful for screenshots and testing):

| URL parameter         | Effect                        |
| --------------------- | ----------------------------- |
| `?mock-slow`          | Every request takes 3 seconds |
| `?mock-error=claims`  | The claims list fails         |
| `?mock-error=claim`   | The claim detail fails        |
| `?mock-error=summary` | The summary cards fail        |
| `?mock-error=upload`  | Document upload fails         |
