// API contract agreed with the (mocked) backend team.
// See docs/api.md for endpoint details.

export type ClaimStatus = 'approved' | 'pending' | 'denied' | 'review';
export type ClaimType = 'auto' | 'home';
export type StepState = 'completed' | 'current' | 'upcoming';
export type DocumentStatus = 'needed' | 'received' | 'in_review';

export type Adjuster = {
  name: string;
  email: string;
  phone: string;
  responseTime: string;
};

export type TimelineStep = {
  id: string;
  title: string;
  detail: string;
  state: StepState;
};

export type ClaimDocument = {
  id: string;
  name: string;
  required: boolean;
  status: DocumentStatus;
  dueDate?: string; // ISO date
  receivedDate?: string; // ISO date
  fileName?: string;
};

export type Payout = {
  estimate: number | null;
  estimateConfirmed: boolean;
  deductible: number;
  amount: number | null;
  expectedDate?: string; // ISO date
  paidDate?: string; // ISO date
  method: string;
};

/** Short form returned by GET /api/claims. */
export type ClaimSummary = {
  id: string;
  type: ClaimType;
  title: string;
  status: ClaimStatus;
  filedDate: string; // ISO date
  adjusterName: string;
  nextStep: string;
  actionNeeded: boolean;
};

/** Present when a claim has been denied: why, and how to appeal. */
export type Decision = {
  reason: string;
  policySection: string;
  appealBy: string; // ISO date
};

/** Full form returned by GET /api/claims/:id. */
export type Claim = ClaimSummary & {
  incidentDate: string; // ISO date
  adjuster: Adjuster;
  timeline: TimelineStep[];
  documents: ClaimDocument[];
  payout: Payout;
  decision?: Decision;
};

export type AccountSummary = {
  firstName: string;
  openClaims: number;
  actionsNeeded: number;
  paidThisYear: number;
  closedClaimsThisYear: number;
  nextPayment: { claimId: string; date: string } | null;
};

export type ClaimFilters = {
  status?: ClaimStatus | 'all';
  q?: string;
  sort?: 'newest' | 'oldest';
};

export type UploadResult = {
  document: ClaimDocument;
};

export type ApiErrorBody = {
  error: string;
  message: string;
};
