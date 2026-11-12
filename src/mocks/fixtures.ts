import type { AccountSummary, Claim } from '../api/types';

// Realistic but fictional data for one Prairie Mutual policyholder.
// Dates line up with the Figma screens (mid-November 2026).

export const policyholder = { firstName: 'Jordan' };

export const claims: Claim[] = [
  {
    id: 'CLM-20481',
    type: 'auto',
    title: 'Rear-end collision',
    status: 'pending',
    filedDate: '2026-10-28',
    incidentDate: '2026-10-26',
    adjusterName: 'R. Alvarez',
    nextStep: 'Upload repair estimate',
    actionNeeded: true,
    adjuster: {
      name: 'Rosa Alvarez',
      email: 'rosa.alvarez@prairiemutual.example',
      phone: '(800) 555-0142',
      responseTime: 'Usually replies within 1 business day',
    },
    timeline: [
      { id: 'filed', title: 'Claim filed', detail: 'Oct 28, 2026', state: 'completed' },
      {
        id: 'assigned',
        title: 'Adjuster assigned',
        detail: 'Oct 29, 2026 · R. Alvarez',
        state: 'completed',
      },
      {
        id: 'inspection',
        title: 'Damage inspection',
        detail: 'Scheduled Nov 14, 2026',
        state: 'current',
      },
      {
        id: 'estimate',
        title: 'Estimate review',
        detail: 'After your estimate is uploaded',
        state: 'upcoming',
      },
      {
        id: 'payment',
        title: 'Payment issued',
        detail: 'Expected by Dec 2, 2026',
        state: 'upcoming',
      },
    ],
    documents: [
      {
        id: 'doc-estimate',
        name: 'Repair estimate',
        required: true,
        status: 'needed',
        dueDate: '2026-11-18',
      },
      {
        id: 'doc-police',
        name: 'Police report',
        required: true,
        status: 'received',
        receivedDate: '2026-10-29',
      },
      {
        id: 'doc-photos',
        name: 'Damage photos (6)',
        required: true,
        status: 'received',
        receivedDate: '2026-10-28',
      },
    ],
    payout: {
      estimate: 5800,
      estimateConfirmed: false,
      deductible: 500,
      amount: 5300,
      expectedDate: '2026-12-02',
      method: 'Direct deposit',
    },
  },
  {
    id: 'CLM-19807',
    type: 'home',
    title: 'Water damage, basement',
    status: 'review',
    filedDate: '2026-09-30',
    incidentDate: '2026-09-27',
    adjusterName: 'K. Osei',
    nextStep: 'Inspection report in review',
    actionNeeded: false,
    adjuster: {
      name: 'Kwame Osei',
      email: 'kwame.osei@prairiemutual.example',
      phone: '(800) 555-0177',
      responseTime: 'Usually replies within 2 business days',
    },
    timeline: [
      { id: 'filed', title: 'Claim filed', detail: 'Sep 30, 2026', state: 'completed' },
      {
        id: 'assigned',
        title: 'Adjuster assigned',
        detail: 'Oct 1, 2026 · K. Osei',
        state: 'completed',
      },
      {
        id: 'inspection',
        title: 'Home inspection',
        detail: 'Completed Oct 15, 2026',
        state: 'completed',
      },
      {
        id: 'review',
        title: 'Inspection report review',
        detail: 'Started Oct 20, 2026',
        state: 'current',
      },
      {
        id: 'payment',
        title: 'Payment issued',
        detail: 'Date set after review',
        state: 'upcoming',
      },
    ],
    documents: [
      {
        id: 'doc-photos',
        name: 'Damage photos (14)',
        required: true,
        status: 'received',
        receivedDate: '2026-09-30',
      },
      {
        id: 'doc-plumber',
        name: 'Plumber invoice',
        required: true,
        status: 'received',
        receivedDate: '2026-10-03',
      },
      {
        id: 'doc-inspection',
        name: 'Inspection report',
        required: true,
        status: 'in_review',
        receivedDate: '2026-10-15',
      },
    ],
    payout: {
      estimate: null,
      estimateConfirmed: false,
      deductible: 1000,
      amount: null,
      method: 'Direct deposit',
    },
  },
  {
    id: 'CLM-17342',
    type: 'auto',
    title: 'Windshield replacement',
    status: 'approved',
    filedDate: '2026-06-12',
    incidentDate: '2026-06-10',
    adjusterName: 'R. Alvarez',
    nextStep: 'Paid $4,250 on Jul 3, 2026',
    actionNeeded: false,
    adjuster: {
      name: 'Rosa Alvarez',
      email: 'rosa.alvarez@prairiemutual.example',
      phone: '(800) 555-0142',
      responseTime: 'Usually replies within 1 business day',
    },
    timeline: [
      { id: 'filed', title: 'Claim filed', detail: 'Jun 12, 2026', state: 'completed' },
      {
        id: 'assigned',
        title: 'Adjuster assigned',
        detail: 'Jun 12, 2026 · R. Alvarez',
        state: 'completed',
      },
      {
        id: 'estimate',
        title: 'Estimate approved',
        detail: 'Jun 20, 2026',
        state: 'completed',
      },
      { id: 'payment', title: 'Payment issued', detail: 'Paid Jul 3, 2026', state: 'completed' },
    ],
    documents: [
      {
        id: 'doc-invoice',
        name: 'Glass shop invoice',
        required: true,
        status: 'received',
        receivedDate: '2026-06-18',
      },
    ],
    payout: {
      estimate: 4500,
      estimateConfirmed: true,
      deductible: 250,
      amount: 4250,
      paidDate: '2026-07-03',
      method: 'Direct deposit',
    },
  },
];

export function buildSummary(list: Claim[]): AccountSummary {
  const open = list.filter((c) => c.status !== 'approved' && c.status !== 'denied');
  const paid = list.filter((c) => c.payout.paidDate?.startsWith('2026'));
  const upcoming = open
    .filter((c) => c.payout.expectedDate)
    .sort((a, b) => a.payout.expectedDate!.localeCompare(b.payout.expectedDate!))[0];
  return {
    firstName: policyholder.firstName,
    openClaims: open.length,
    actionsNeeded: list.filter((c) => c.actionNeeded).length,
    paidThisYear: paid.reduce((sum, c) => sum + (c.payout.amount ?? 0), 0),
    closedClaimsThisYear: paid.length,
    nextPayment: upcoming ? { claimId: upcoming.id, date: upcoming.payout.expectedDate! } : null,
  };
}
