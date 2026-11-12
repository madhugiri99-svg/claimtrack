import { delay, http, HttpResponse } from 'msw';
import type { ApiErrorBody, Claim, ClaimSummary, UploadResult } from '../api/types';
import { buildSummary, claims as seed } from './fixtures';

// In-memory copy so uploads change the data for the rest of the session.
let db: Claim[] = structuredClone(seed);
export const resetDb = () => {
  db = structuredClone(seed);
};

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Demo switch for loading and error states, e.g. add `?mock-error=claims`
 * to the page URL to make GET /api/claims fail. Values: claims, claim,
 * summary, upload. Add `?mock-slow` for a 3s delay.
 */
function demoFlags() {
  const params = new URLSearchParams(globalThis.location?.search ?? '');
  return { fail: params.get('mock-error'), slow: params.has('mock-slow') };
}

async function simulateNetwork() {
  await delay(demoFlags().slow ? 3000 : 300 + Math.random() * 400);
}

const serverError = () =>
  HttpResponse.json<ApiErrorBody>(
    { error: 'server_error', message: 'Something went wrong on our side. Please try again.' },
    { status: 500 },
  );

const toSummary = ({
  id,
  type,
  title,
  status,
  filedDate,
  adjusterName,
  nextStep,
  actionNeeded,
}: Claim): ClaimSummary => ({
  id,
  type,
  title,
  status,
  filedDate,
  adjusterName,
  nextStep,
  actionNeeded,
});

export const handlers = [
  http.get('*/api/summary', async () => {
    await simulateNetwork();
    if (demoFlags().fail === 'summary') return serverError();
    return HttpResponse.json(buildSummary(db));
  }),

  http.get('*/api/claims', async ({ request }) => {
    await simulateNetwork();
    if (demoFlags().fail === 'claims') return serverError();

    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const q = url.searchParams.get('q')?.trim().toLowerCase();
    const sort = url.searchParams.get('sort') ?? 'newest';

    let list = db.map(toSummary);
    if (status && status !== 'all') list = list.filter((c) => c.status === status);
    if (q) {
      list = list.filter((c) =>
        [c.id, c.title, c.type, c.adjusterName].some((field) => field.toLowerCase().includes(q)),
      );
    }
    list.sort((a, b) =>
      sort === 'oldest'
        ? a.filedDate.localeCompare(b.filedDate)
        : b.filedDate.localeCompare(a.filedDate),
    );
    return HttpResponse.json(list);
  }),

  http.get('*/api/claims/:id', async ({ params }) => {
    await simulateNetwork();
    if (demoFlags().fail === 'claim') return serverError();
    const claim = db.find((c) => c.id === params.id);
    if (!claim) {
      return HttpResponse.json<ApiErrorBody>(
        { error: 'not_found', message: `We couldn’t find claim ${params.id}.` },
        { status: 404 },
      );
    }
    return HttpResponse.json(claim);
  }),

  http.post('*/api/claims/:id/documents', async ({ params, request }) => {
    await simulateNetwork();
    if (demoFlags().fail === 'upload') return serverError();

    const claim = db.find((c) => c.id === params.id);
    if (!claim) {
      return HttpResponse.json(
        {
          error: 'not_found',
          message: `We couldn’t find claim ${params.id}.`,
        } satisfies ApiErrorBody,
        { status: 404 },
      );
    }

    const form = await request.formData();
    const documentId = form.get('documentId');
    const file = form.get('file');
    const doc = claim.documents.find((d) => d.id === documentId);

    if (!doc) {
      return HttpResponse.json(
        { error: 'not_found', message: 'That document request no longer exists.' },
        { status: 404 },
      );
    }
    if (!(file instanceof File)) {
      return HttpResponse.json(
        { error: 'validation', message: 'Choose a file to upload.' },
        { status: 422 },
      );
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return HttpResponse.json(
        { error: 'validation', message: 'Files must be PDF, JPG or PNG.' },
        { status: 422 },
      );
    }
    if (file.size > MAX_BYTES) {
      return HttpResponse.json(
        { error: 'validation', message: 'Files must be 10 MB or smaller.' },
        { status: 422 },
      );
    }

    doc.status = 'received';
    doc.receivedDate = new Date().toISOString().slice(0, 10);
    doc.fileName = file.name;
    if (!claim.documents.some((d) => d.required && d.status === 'needed')) {
      claim.actionNeeded = false;
      claim.status = 'review';
      claim.nextStep = 'Repair estimate in review';
    }
    return HttpResponse.json({ document: doc } satisfies UploadResult, { status: 201 });
  }),
];
