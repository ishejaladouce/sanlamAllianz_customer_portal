export const faqCategories = [
  { id: 'all', label: 'All topics' },
  { id: 'portal', label: 'Using the portal' },
  { id: 'policies', label: 'Policies' },
  { id: 'claims', label: 'Claims' },
  { id: 'payments', label: 'Payments' },
  { id: 'services', label: 'Services' },
  { id: 'security', label: 'Security' },
]

export const faqItems = [
  {
    id: 'login',
    category: 'portal',
    question: 'How do I sign in to the customer portal?',
    answer:
      'Enter your 16-digit Rwandan National ID number on the login page. We send a one-time password (OTP) to the mobile number registered on your policy. Enter any 6-digit code in this demo environment. For production, use the code received by SMS.',
  },
  {
    id: 'navigate',
    category: 'portal',
    question: 'What can I do in this portal?',
    answer:
      'The portal lets you view all your SanlamAllianz policies, track claim progress, download statements, make and review payments, raise service requests, manage your profile and banking details, and receive notifications about actions that need your attention.',
  },
  {
    id: 'dashboard',
    category: 'portal',
    question: 'What does the Dashboard show?',
    answer:
      'Your Dashboard gives a snapshot of your portfolio: active policies, open claims, total premiums paid, and upcoming maturity dates. Items needing attention — such as a dormant policy or a claim awaiting documents — are highlighted at the top so you can act quickly.',
  },
  {
    id: 'notifications',
    category: 'portal',
    question: 'How do notifications work?',
    answer:
      'Notifications alert you to premium arrears, claim status changes, payment confirmations, and requests for missing documents. Open the bell icon in the top bar to view them. Unread items are marked with a red dot.',
  },
  {
    id: 'policy-status',
    category: 'policies',
    question: 'What do policy statuses mean?',
    answer:
      'In Force — your policy is active and premiums are up to date. Dormant — premiums have been missed; pay outstanding amounts to avoid lapsing. Paid Up — all scheduled premiums have been received and the policy is on track for maturity or surrender options. Lapsed — cover has ended due to non-payment; contact support to discuss reinstatement.',
  },
  {
    id: 'policy-cards',
    category: 'policies',
    question: 'How do I read my policy cards?',
    answer:
      'Each card shows your policy number, plan name, monthly premium, total premiums paid, effective date, and maturity date. Use Statement to download your payment history and Contract to view policy terms. Notify Claim starts a new claim linked to that policy.',
  },
  {
    id: 'dormant',
    category: 'policies',
    question: 'My policy is dormant — what should I do?',
    answer:
      'A dormant policy means one or more premiums were not received on time. Pay the outstanding amount from the Payments page or via your usual payment method (salary deduction, bank transfer, or mobile money). Policies with repeated missed payments may lapse and lose cover.',
  },
  {
    id: 'beneficiaries',
    category: 'policies',
    question: 'Can I update beneficiaries or contact details?',
    answer:
      'Yes. Raise a Service Request under Contract Update with your policy number and the changes you need. For death benefit nominations, you may need to complete a signed nomination form — our team will guide you.',
  },
  {
    id: 'claim-start',
    category: 'claims',
    question: 'How do I file a new claim?',
    answer:
      'Click Start claim from the Claims page or Dashboard. Select your policy and claim type, verify your identity with OTP, enter the amount, upload required documents, provide bank details, and submit. You receive a reference number (e.g. CLM-2025-0041) to track progress.',
  },
  {
    id: 'claim-types',
    category: 'claims',
    question: 'What types of claims can I submit?',
    answer:
      'Available claim types depend on your plan. Common types include Ad-hoc Withdrawal (ADW), Surrender (SUR), Maturity (MAT), Refund (REF), Death (DTH), and Funeral Fees (FUN/FFB). The wizard only shows claim types applicable to your selected policy.',
  },
  {
    id: 'claim-sla',
    category: 'claims',
    question: 'How long does claim processing take?',
    answer:
      'Processing times (working days) vary by claim type: online withdrawals — 3 days; standard withdrawals and refunds — 10 days; surrender and compensation — 20 days; maturity — 5 days; death claims — 5 days; funeral claims — 1 day (24-hour priority). The SLA progress bar on each claim shows elapsed time against the applicable period.',
  },
  {
    id: 'claim-docs',
    category: 'claims',
    question: 'What documents are usually required?',
    answer:
      'Most claims require National ID, bank account details, and a signed claim form. Withdrawals may need a request letter and policy document. Death claims require a death certificate and medical report. Funeral claims need a funeral invoice and death certificate. Upload all required documents to avoid delays.',
  },
  {
    id: 'claim-pending',
    category: 'claims',
    question: 'My claim says "Pending Information" — what now?',
    answer:
      'We need additional documents before assessment can continue. Open the claim and use Upload documents to submit the missing files. Your claim will resume once verification is complete. Claims with missing documents are paused and may exceed the SLA until documents are received.',
  },
  {
    id: 'claim-funeral',
    category: 'claims',
    question: 'Are funeral claims treated differently?',
    answer:
      'Yes. Funeral fee claims (FUN, FFB, FRF) receive 24-hour priority processing once all documents are complete. Submit the funeral invoice, death certificate, and National ID as soon as possible.',
  },
  {
    id: 'claim-payment',
    category: 'claims',
    question: 'When will I receive payment after approval?',
    answer:
      'Approved withdrawal claims are typically paid within 10 working days to your registered bank account. Payment details — bank name and masked account number — appear on the claim once paid. Maturity and surrender payments follow the same timeline after final approval.',
  },
  {
    id: 'premiums',
    category: 'payments',
    question: 'How are premiums collected?',
    answer:
      'Premiums may be collected via salary deduction, bank transfer, or mobile money depending on your policy. Your policy card shows the payment method and next premium date. Keep sufficient funds available to maintain In Force status.',
  },
  {
    id: 'payment-history',
    category: 'payments',
    question: 'Where can I see payment and refund history?',
    answer:
      'The Payments page lists all credits (claims paid, refunds received) and pending items. Use Download statement for a summary of transactions linked to your policies.',
  },
  {
    id: 'overdue',
    category: 'payments',
    question: 'How do I pay outstanding premiums?',
    answer:
      'From a dormant policy card, click Pay outstanding to go to Payments. You can also contact your employer for salary deduction policies or transfer to the SanlamAllianz account advised by your branch. Always quote your policy number as reference.',
  },
  {
    id: 'service-request',
    category: 'services',
    question: 'What is a service request?',
    answer:
      'Service requests cover non-claim matters: contract updates, underwriting queries, payment enquiries, and general assistance. Each request gets a reference (e.g. SVC-2025-0043) and is assigned to the relevant team. Track progress on the Service requests page.',
  },
  {
    id: 'service-new',
    category: 'services',
    question: 'How do I raise a new service request?',
    answer:
      'Click New request on the Service requests page. Choose a category, select the policy, and describe what you need. Our team responds within standard service timelines. Urgent policy or claim matters should also be reported by phone.',
  },
  {
    id: 'profile-banking',
    category: 'security',
    question: 'How do I update my bank details?',
    answer:
      'Go to Profile → Banking. Changes may require verification before claim payments are sent to a new account. For security, large or frequent changes can trigger additional checks by our team.',
  },
  {
    id: 'otp-security',
    category: 'security',
    question: 'Why is OTP required for claims?',
    answer:
      'Identity verification protects your policies and payouts from fraud. OTP is required when filing a claim and at sensitive profile changes. Never share your OTP with anyone — SanlamAllianz staff will never ask for it.',
  },
  {
    id: 'support',
    category: 'portal',
    question: 'How do I contact support?',
    answer:
      'Use the WhatsApp button for quick chat, raise a service request under Services, or read the FAQ guide. For emergencies such as death notification, call our helpline directly — do not rely on the portal alone.',
  },
]

export function searchFaq(query, category = 'all') {
  const q = query.trim().toLowerCase()
  return faqItems.filter((item) => {
    if (category !== 'all' && item.category !== category) return false
    if (!q) return true
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    )
  })
}

export function getFaqByCategory(category) {
  if (category === 'all') return faqItems
  return faqItems.filter((item) => item.category === category)
}
