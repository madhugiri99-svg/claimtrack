import type {
  AccountSummary,
  ApiErrorBody,
  Claim,
  ClaimFilters,
  ClaimSummary,
  UploadResult,
} from './types';

// The only place that knows the API's base URL. Pointing the app at a real
// backend means changing this one line.
const API_BASE = `${import.meta.env.BASE_URL}api`;

export class ApiError extends Error {
  status: number;
  code: string;
  constructor(status: number, body: ApiErrorBody) {
    super(body.message);
    this.status = status;
    this.code = body.error;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) {
    const body: ApiErrorBody = await res
      .json()
      .catch(() => ({ error: 'unknown', message: 'Something went wrong. Please try again.' }));
    throw new ApiError(res.status, body);
  }
  return res.json() as Promise<T>;
}

export function getSummary() {
  return request<AccountSummary>('/summary');
}

export function getClaims(filters: ClaimFilters = {}) {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== 'all') params.set('status', filters.status);
  if (filters.q) params.set('q', filters.q);
  if (filters.sort) params.set('sort', filters.sort);
  const query = params.toString();
  return request<ClaimSummary[]>(`/claims${query ? `?${query}` : ''}`);
}

export function getClaim(id: string) {
  return request<Claim>(`/claims/${encodeURIComponent(id)}`);
}

export function uploadDocument(claimId: string, documentId: string, file: File) {
  const body = new FormData();
  body.set('documentId', documentId);
  body.set('file', file);
  return request<UploadResult>(`/claims/${encodeURIComponent(claimId)}/documents`, {
    method: 'POST',
    body,
  });
}
