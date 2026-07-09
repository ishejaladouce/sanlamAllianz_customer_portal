/** SanlamAllianz Life Insurance Rwanda — mock data from real company documents */

export const user = {
  id: 'usr_001',
  name: 'BAHIZI JOSPIN RUGAMBA',
  displayName: 'Jospin Rugamba',
  initials: 'JR',
  nationalId: '1199680011973101',
  phone: '0785842952',
  address: 'GASABO, KIGALI',
  district: 'GASABO',
  sector: 'GISOZI',
  email: 'jospin.rugamba@email.com',
  dateOfBirth: '1996-10-28',
  language: 'en',
}

/** WhatsApp Business — number can be set in .env */
export const supportWhatsApp = {
  number: import.meta.env.VITE_WHATSAPP_NUMBER ?? '250788305000',
  display: '+250 788 305 000',
  hours: 'Mon–Fri, 8am–5pm',
  team: 'SanlamAllianz Customer Care',
}

export const policies = [
  {
    id: 'pol_001',
    policyNumber: 'F425316',
    plan: 'NTABARA',
    fullPlanName: 'UBWISHINGIZI BWO GUSHYINGURA',
    status: 'Active',
    premium: 20000,
    premiumFrequency: 'Monthly',
    paymentMethod: 'Salary Deduction',
    sumAssured: 3000000,
    startDate: '2024-11-25',
    maturityDate: '2061-11-24',
    durationYears: 37,
    totalPaid: 60000,
    nextPremiumDate: '2025-07-25',
    beneficiaries: [
      { name: 'BAHIZI JOSPIN RUGAMBA', relationship: 'Self', amount: 3000000 },
      { name: 'BAHIZI NYABUMONDO JEAN', relationship: 'Father', amount: 3000000 },
      { name: 'MATABISHI CIZA GERTURDE', relationship: 'Mother', amount: 3000000 },
    ],
    branch: 'HEAD QUARTER',
    agentCode: '09999 BUREAU DIRECT SANLAM VIE PLC',
  },
  {
    id: 'pol_002',
    policyNumber: 'P443216',
    plan: 'TEGANYA',
    fullPlanName: 'TEGANYA Pension Plan',
    status: 'Dormant',
    premium: 21886,
    premiumFrequency: 'Monthly',
    paymentMethod: 'Bank Transfer',
    sumAssured: 5000000,
    startDate: '2023-08-25',
    maturityDate: '2043-08-25',
    durationYears: 20,
    totalPaid: 2542510,
    nextPremiumDate: '2025-07-25',
    beneficiaries: [
      { name: 'BAHIZI JOSPIN RUGAMBA', relationship: 'Self', amount: 5000000 },
    ],
    branch: 'KIGALI BRANCH',
    agentCode: 'AGT-2291',
    overdueMonths: 3,
    overdueAmount: 65658,
  },
  {
    id: 'pol_003',
    policyNumber: 'F393199',
    plan: 'FUNERAL PLAN',
    fullPlanName: 'Funeral Plan',
    status: 'Active',
    premium: 3000,
    premiumFrequency: 'Monthly',
    paymentMethod: 'Mobile Money',
    sumAssured: 500000,
    startDate: '2023-08-25',
    maturityDate: '2033-08-25',
    durationYears: 10,
    totalPaid: 102000,
    nextPremiumDate: '2025-07-25',
    beneficiaries: [
      { name: 'BAHIZI JOSPIN RUGAMBA', relationship: 'Self', amount: 500000 },
    ],
    branch: 'KIGALI BRANCH',
    agentCode: 'AGT-1105',
  },
  {
    id: 'pol_004',
    policyNumber: 'S393198',
    plan: 'SAFE FAMILY',
    fullPlanName: 'Safe Family Plan',
    status: 'Active',
    premium: 28429,
    premiumFrequency: 'Monthly',
    paymentMethod: 'Bank Transfer',
    sumAssured: 10000000,
    startDate: '2023-08-25',
    maturityDate: '2038-08-25',
    durationYears: 15,
    totalPaid: 585234,
    nextPremiumDate: '2025-07-25',
    beneficiaries: [
      { name: 'BAHIZI JOSPIN RUGAMBA', relationship: 'Self', amount: 10000000 },
    ],
    branch: 'HEAD QUARTER',
    agentCode: 'AGT-3344',
    overdueAmount: 0,
  },
  {
    id: 'pol_005',
    policyNumber: 'E284401',
    plan: 'INDEZO',
    fullPlanName: 'INDEZO Education Plan',
    status: 'Paid Up',
    premium: 45000,
    premiumFrequency: 'Monthly',
    paymentMethod: 'Salary Deduction',
    sumAssured: 8000000,
    startDate: '2018-06-01',
    maturityDate: '2033-06-01',
    durationYears: 15,
    totalPaid: 8100000,
    nextPremiumDate: null,
    beneficiaries: [
      { name: 'BAHIZI JOSPIN RUGAMBA', relationship: 'Self', amount: 8000000 },
    ],
    branch: 'HEAD QUARTER',
    agentCode: 'AGT-0088',
  },
]

export const claimTypes = [
  { code: 'ADW', name: 'Ad-hoc Withdrawal (Advance)', applicablePlans: ['TEGANYA', 'Retirement', 'INDEZO', 'NTABARA'] },
  { code: 'SUR', name: 'Surrender (Total Withdrawal)', applicablePlans: ['TEGANYA', 'Retirement', 'INDEZO', 'NTABARA'] },
  { code: 'MAT', name: 'Maturity', applicablePlans: ['TEGANYA', 'Retirement'] },
  { code: 'CMP', name: 'Compensation Claim', applicablePlans: ['TEGANYA', 'Retirement', 'INDEZO', 'NTABARA'] },
  { code: 'REF', name: 'Refund', applicablePlans: ['TEGANYA', 'Retirement', 'INDEZO', 'NTABARA'] },
  { code: 'RAS', name: 'Refund After Surrender', applicablePlans: ['TEGANYA', 'Retirement', 'INDEZO'] },
  { code: 'CNC', name: 'Refund by Cancellation', applicablePlans: ['TEGANYA', 'Retirement', 'INDEZO'] },
  { code: 'DTH', name: 'Death Claim (Individual)', applicablePlans: ['TEGANYA', 'Retirement', 'SAFE FAMILY', 'NTABARA'] },
  { code: 'FUN', name: 'Funeral Fees Benefit', applicablePlans: ['FUNERAL PLAN'] },
  { code: 'FRF', name: 'Refund on Funeral Plan', applicablePlans: ['FUNERAL PLAN'] },
  { code: 'FFB', name: 'Funeral Fees Benefit', applicablePlans: ['FUNERAL PLAN'] },
  { code: 'PPD', name: 'Partial and Permanent Disability', applicablePlans: ['SAFE FAMILY', 'Group Life'] },
  { code: 'PTD', name: 'Permanent Total Disability', applicablePlans: ['SAFE FAMILY', 'Group Life'] },
  { code: 'LOS', name: 'Loss of Income', applicablePlans: ['SAFE FAMILY'] },
  { code: 'SDF', name: 'Survival Benefit', applicablePlans: ['INDEZO'] },
  { code: 'PMC', name: 'Partial Maturity Claims', applicablePlans: ['INDEZO'] },
  { code: 'RFE', name: 'Refund Premium Paid After Surrender/Education', applicablePlans: ['INDEZO'] },
  { code: 'SDM', name: 'Death Claim Member - Safe Family', applicablePlans: ['SAFE FAMILY'] },
  { code: 'SDP', name: 'Death Claim Principal - Safe Family', applicablePlans: ['SAFE FAMILY'] },
  { code: 'SLO', name: 'Safe Family Loss of Revenue Rider', applicablePlans: ['SAFE FAMILY'] },
  { code: 'SPP', name: 'Safe Family Partial and Permanent Disability', applicablePlans: ['SAFE FAMILY'] },
  { code: 'SRF', name: 'Refund Premium - Safe Family', applicablePlans: ['SAFE FAMILY'] },
]

export const claimTAT = {
  'Withdrawal claims': 10,
  'Online Withdrawal claims': 3,
  'Surrender / Compensation': 20,
  'Maturity claims': 5,
  'Refund claims': 10,
  'Death claims': 5,
  'Funeral claims': 1,
  'Other risk claims': 5,
  'Compensation claims': 15,
  'Hospital Cash claims': 5,
  'Loss of Income claims': 5,
  'Retrenchment claims': 5,
}

export const claims = [
  {
    id: 'clm_001',
    reference: 'CLM-2025-0041',
    claimCode: 'ADW',
    claimType: 'Ad-hoc Withdrawal (Advance)',
    policyId: 'pol_002',
    policyNumber: 'P443216',
    plan: 'TEGANYA',
    submittedDate: '2025-06-01',
    eventDate: '2025-05-28',
    amountClaimed: 500000,
    amountApproved: null,
    status: 'Under Review',
    slaWorkingDays: 10,
    daysElapsed: 7,
    assignedOfficer: 'Claims Officer',
    documents: [
      { name: 'National ID', status: 'uploaded', required: true },
      { name: 'Bank Account Details', status: 'uploaded', required: true },
      { name: 'Request Letter', status: 'uploaded', required: true },
      { name: 'Policy Document', status: 'missing', required: true },
    ],
    journey: [
      { step: 'Submitted', date: '2025-06-01', done: true },
      { step: 'Document Check', date: '2025-06-02', done: true },
      { step: 'Claims Assessment', date: null, done: false, active: true },
      { step: 'Approval', date: null, done: false },
      { step: 'Payment', date: null, done: false },
    ],
    notes: 'Claim admitted. Document verification complete. Under assessment.',
  },
  {
    id: 'clm_002',
    reference: 'CLM-2024-0199',
    claimCode: 'SUR',
    claimType: 'Surrender (Total Withdrawal)',
    policyId: 'pol_003',
    policyNumber: 'F393199',
    plan: 'FUNERAL PLAN',
    submittedDate: '2024-11-12',
    eventDate: '2024-11-12',
    amountClaimed: 1800000,
    amountApproved: 1800000,
    status: 'Paid',
    slaWorkingDays: 20,
    daysElapsed: 18,
    paymentDate: '2025-04-02',
    paymentMethod: 'Bank Transfer',
    bankName: 'Bank of Kigali',
    bankAccount: '****5566',
    documents: [
      { name: 'National ID', status: 'uploaded', required: true },
      { name: 'Bank Account Details', status: 'uploaded', required: true },
      { name: 'Signed Claim Form', status: 'uploaded', required: true },
      { name: 'Policy Document', status: 'uploaded', required: true },
    ],
    journey: [
      { step: 'Submitted', date: '2024-11-12', done: true },
      { step: 'Document Check', date: '2024-11-13', done: true },
      { step: 'Claims Assessment', date: '2024-11-20', done: true },
      { step: 'Approval', date: '2025-03-28', done: true },
      { step: 'Payment', date: '2025-04-02', done: true },
    ],
  },
  {
    id: 'clm_003',
    reference: 'CLM-2024-0177',
    claimCode: 'REF',
    claimType: 'Refund',
    policyId: 'pol_004',
    policyNumber: 'S393198',
    plan: 'SAFE FAMILY',
    submittedDate: '2024-11-05',
    eventDate: '2024-11-05',
    amountClaimed: 125065,
    amountApproved: null,
    status: 'Pending Information',
    slaWorkingDays: 10,
    daysElapsed: 12,
    missingDocuments: ['National ID copy', 'Bank Statement'],
    documents: [
      { name: 'National ID', status: 'missing', required: true },
      { name: 'Bank Statement', status: 'missing', required: true },
      { name: 'Signed Claim Form', status: 'uploaded', required: true },
    ],
    journey: [
      { step: 'Submitted', date: '2024-11-05', done: true },
      { step: 'Document Check', date: '2024-11-06', done: true, issue: 'Missing docs' },
      { step: 'Claims Assessment', date: null, done: false, blocked: true },
      { step: 'Approval', date: null, done: false },
      { step: 'Payment', date: null, done: false },
    ],
    notes: 'Claim on hold. Please upload your National ID and Bank Statement to proceed.',
  },
  {
    id: 'clm_004',
    reference: 'CLM-2023-0082',
    claimCode: 'MAT',
    claimType: 'Maturity Claim',
    policyId: 'pol_001',
    policyNumber: 'F425316',
    plan: 'NTABARA',
    submittedDate: '2025-01-05',
    eventDate: '2025-01-05',
    amountClaimed: 1700000,
    amountApproved: 1700000,
    status: 'Paid',
    slaWorkingDays: 5,
    daysElapsed: 5,
    paymentDate: '2025-01-10',
    paymentMethod: 'Bank Transfer',
    bankName: 'Equity Bank',
    bankAccount: '****1234',
    journey: [
      { step: 'Submitted', date: '2025-01-05', done: true },
      { step: 'Document Check', date: '2025-01-05', done: true },
      { step: 'Claims Assessment', date: '2025-01-07', done: true },
      { step: 'Approval', date: '2025-01-09', done: true },
      { step: 'Payment', date: '2025-01-10', done: true },
    ],
  },
]

export const payments = [
  {
    id: 'pay_001',
    reference: 'PAY-2025-04-001',
    claimReference: 'CLM-2024-0199',
    description: 'Surrender Payment — Funeral Plan',
    policyNumber: 'F393199',
    date: '2025-04-02',
    amount: 1800000,
    type: 'credit',
    status: 'Received',
    paymentMethod: 'Bank Transfer',
    bankName: 'Bank of Kigali',
  },
  {
    id: 'pay_002',
    reference: 'PAY-2025-01-002',
    claimReference: 'CLM-2023-0082',
    description: 'Maturity Instalment — NTABARA',
    policyNumber: 'F425316',
    date: '2025-01-10',
    amount: 1700000,
    type: 'credit',
    status: 'Received',
    paymentMethod: 'Bank Transfer',
    bankName: 'Equity Bank',
  },
  {
    id: 'pay_003',
    reference: 'PAY-2025-06-003',
    claimReference: 'CLM-2025-0038',
    description: 'Awaiting Payment — Ad-hoc Withdrawal',
    policyNumber: 'P443216',
    date: null,
    expectedDate: '2025-07-02',
    amount: 500000,
    type: 'pending',
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    bankName: 'BPR Bank',
    note: 'Processing — expected within 2 business days',
  },
]

export const notifications = [
  {
    id: 'notif_001',
    type: 'missing_document',
    priority: 'urgent',
    title: 'Missing document — CLM-2024-0177',
    body: 'Your refund claim is on hold. Please upload your National ID to proceed. The claim is now overdue.',
    actionLabel: 'Upload Now',
    actionRoute: '/claims/clm_003/documents',
    read: false,
    date: '2025-06-23T09:14:00',
  },
  {
    id: 'notif_002',
    type: 'policy_warning',
    priority: 'high',
    title: 'Policy P443216 has moved to Dormant',
    body: 'You have missed 3 consecutive premium payments of RWF 21,886. Your TEGANYA policy will lapse if you miss a further 1 payment. Total overdue: RWF 65,658.',
    actionLabel: 'Pay Outstanding',
    actionRoute: '/payments',
    read: false,
    date: '2025-06-20T14:30:00',
  },
  {
    id: 'notif_003',
    type: 'claim_update',
    priority: 'normal',
    title: 'Claim CLM-2025-0041 is under review',
    body: 'Your Ad-hoc Withdrawal claim has been received and is being assessed by the claims team. SLA: 10 working days from June 1, 2025.',
    actionLabel: null,
    read: false,
    date: '2025-06-01T10:00:00',
  },
  {
    id: 'notif_004',
    type: 'success',
    priority: 'normal',
    title: 'Payment received — CLM-2024-0199',
    body: 'Your Surrender claim has been settled. RWF 1,800,000 has been credited to Bank of Kigali account ending ****5566.',
    actionLabel: null,
    read: true,
    date: '2025-04-02T16:00:00',
  },
]

export const serviceRequests = [
  {
    id: 'svc_001',
    reference: 'SVC-2025-0043',
    title: 'Contract Terms Review',
    category: 'Contract Update',
    policyNumber: 'F425316',
    status: 'Resolved',
    progress: 100,
    description:
      'Request to review and update contract terms for policy F425316. Customer requested clarification on surrender value calculation.',
    submittedDate: '2025-06-10',
    updatedDate: '2025-06-18',
    assignedTo: 'Customer Care Officer',
  },
  {
    id: 'svc_002',
    reference: 'SVC-2025-0042',
    title: 'Overdue Refund Status',
    category: 'Claims — General',
    policyNumber: 'S393198',
    status: 'In Progress',
    progress: 40,
    description:
      'Follow up on payment status for overdue refund claim. Customer requesting status update on outstanding refund.',
    submittedDate: '2025-06-15',
    updatedDate: '2025-06-22',
    assignedTo: 'Claims Officer',
  },
  {
    id: 'svc_003',
    reference: 'SVC-2025-0041',
    title: 'Payment Status Update',
    category: 'Payments',
    policyNumber: 'P443216',
    status: 'In Progress',
    progress: 65,
    description:
      'Request for update on premium payment allocation and confirmation of last three monthly debits.',
    submittedDate: '2025-06-12',
    updatedDate: '2025-06-21',
    assignedTo: 'Finance Team',
  },
  {
    id: 'svc_004',
    reference: 'SVC-2025-0040',
    title: 'Underwriting Conditions',
    category: 'Claims — Underwriting',
    policyNumber: 'P443216',
    status: 'In Progress',
    progress: 25,
    description:
      'Request to update and review underwriting conditions for policy renewal and reactivation after dormancy.',
    submittedDate: '2025-06-18',
    updatedDate: '2025-06-21',
    assignedTo: 'Underwriting Team',
  },
  {
    id: 'svc_005',
    reference: 'SVC-2025-0039',
    title: 'Claims Follow-up',
    category: 'Claims — General',
    policyNumber: 'S393198',
    status: 'In Progress',
    progress: 80,
    description:
      'Follow-up on claim CLM-2025-0087 documentation. Customer submitted additional bank details.',
    submittedDate: '2025-06-08',
    updatedDate: '2025-06-20',
    assignedTo: 'Claims Officer',
  },
  {
    id: 'svc_006',
    reference: 'SVC-2025-0038',
    title: 'Contract Modifications',
    category: 'Contract Update',
    policyNumber: 'F425316',
    status: 'Pending',
    progress: 10,
    description:
      'Request to update contact phone number from 0785842952 to 0788000111 and mailing address on file.',
    submittedDate: '2025-06-20',
    updatedDate: '2025-06-20',
    assignedTo: 'Customer Care Officer',
  },
]

export const banking = {
  bankName: 'Equity Bank',
  accountNumber: '****1234',
  accountHolder: 'BAHIZI JOSPIN RUGAMBA',
  swiftCode: 'ECORWRWX',
  verified: true,
}

export const rwBanks = [
  'BPR Bank',
  'Bank of Kigali',
  'Equity Bank',
  'I&M Bank',
  'Cogebanque',
  'KCB',
  'GTBank',
]

const claimDocumentsByCode = {
  ADW: ['National ID', 'Bank Account Details', 'Request Letter', 'Policy Document'],
  SUR: ['National ID', 'Bank Account Details', 'Signed Claim Form', 'Policy Document'],
  MAT: ['National ID', 'Bank Account Details', 'Policy Document'],
  REF: ['National ID', 'Bank Statement', 'Signed Claim Form'],
  DTH: ['Death Certificate', 'National ID', 'Medical Report', 'Signed Claim Form', 'Doctor Registration No.'],
  FUN: ['Funeral Invoice', 'Death Certificate', 'National ID'],
  FFB: ['Funeral Invoice', 'Death Certificate', 'National ID'],
  FRF: ['National ID', 'Bank Account Details', 'Signed Claim Form'],
  default: ['National ID', 'Bank Account Details', 'Signed Claim Form'],
}

/** Helpers */

export function getPolicyById(id) {
  return policies.find((p) => p.id === id)
}

export function getClaimById(id) {
  return claims.find((c) => c.id === id)
}

export function getActivePolicies() {
  return policies.filter((p) => p.status === 'Active')
}

export function getDormantPolicies() {
  return policies.filter((p) => p.status === 'Dormant')
}

export function getOpenClaims() {
  return claims.filter((c) => !['Paid', 'Declined'].includes(c.status))
}

export function getClaimTypesForPlan(plan) {
  return claimTypes.filter((t) => t.applicablePlans.includes(plan))
}

export function getSlaProgress(claim) {
  if (['Paid', 'Declined'].includes(claim.status)) {
    return { pct: 100, overdue: false, tone: 'success', label: 'Completed' }
  }
  const pct = Math.min(100, (claim.daysElapsed / claim.slaWorkingDays) * 100)
  const overdue = claim.daysElapsed > claim.slaWorkingDays
  let tone = 'info'
  if (overdue) tone = 'warning'
  else if (pct >= 80) tone = 'warning'
  else if (pct >= 50) tone = 'info'
  return {
    pct,
    overdue,
    tone,
    label: overdue ? 'Overdue' : `${claim.daysElapsed}/${claim.slaWorkingDays} days`,
  }
}

export function getClaimDocumentProgress(claim) {
  if (!claim.documents?.length) return { uploaded: 0, total: 0, pct: 100 }
  const required = claim.documents.filter((d) => d.required !== false)
  const total = required.length || claim.documents.length
  const uploaded = required.filter((d) => d.status === 'uploaded').length
  return { uploaded, total, pct: total ? Math.round((uploaded / total) * 100) : 100 }
}

export function claimNeedsAttention(claim) {
  if (claim.status === 'Pending Information') return true
  if (['Paid', 'Declined'].includes(claim.status)) return false
  return claim.daysElapsed > claim.slaWorkingDays
}

export function getEstimatedDecisionDate(claim) {
  const d = new Date(claim.submittedDate)
  let added = 0
  while (added < claim.slaWorkingDays) {
    d.setDate(d.getDate() + 1)
    const day = d.getDay()
    if (day !== 0 && day !== 6) added += 1
  }
  return d.toISOString().split('T')[0]
}

export function isFuneralUrgent(claim) {
  return ['FUN', 'FFB', 'FRF'].includes(claim.claimCode)
}

export function getTotalReceivedPayments() {
  return payments
    .filter((p) => p.type === 'credit' && p.status === 'Received')
    .reduce((sum, p) => sum + p.amount, 0)
}

export function getPendingPaymentAmount() {
  return payments
    .filter((p) => p.type === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)
}

export function getDashboardActivity() {
  return [
    {
      title: 'CLM-2024-0199 Paid',
      description: `Surrender — ${formatRwf(1800000)}`,
      date: '2025-04-02',
      tone: 'success',
    },
    {
      title: 'CLM-2025-0041 Under Review',
      description: 'ADW Withdrawal — TEGANYA',
      date: '2025-06-01',
      tone: 'warning',
    },
    {
      title: 'CLM-2024-0177 Pending Info',
      description: 'Documents missing — Refund',
      date: '2024-11-05',
      tone: 'danger',
    },
    {
      title: 'P443216 Dormant',
      description: '3 missed premiums — RWF 65,658 overdue',
      date: '2025-06-20',
      tone: 'warning',
    },
    {
      title: 'CLM-2023-0082 Paid',
      description: `Maturity — ${formatRwf(1700000)}`,
      date: '2025-01-10',
      tone: 'success',
    },
  ]
}

export function formatRwf(amount) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(amount ?? 0)
}

export function maskNationalId(id) {
  if (!id || id.length < 8) return id
  return `${id.slice(0, 6)}****${id.slice(-4)}`
}

export function getClaimDocuments(claimCode) {
  return claimDocumentsByCode[claimCode] ?? claimDocumentsByCode.default
}

export function getApprovalNotice(amount) {
  if (amount > 5000000) {
    return {
      level: 'ceo',
      message: 'Requires CEO review before payment — additional 5 working days',
    }
  }
  if (amount > 1000000) {
    return {
      level: 'senior',
      message: 'Requires senior executive approval — may take additional time',
    }
  }
  return null
}

export function authenticateUser(nationalId) {
  if (nationalId === user.nationalId) return user
  return null
}
