import { Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  payments,
  getTotalReceivedPayments,
  getPendingPaymentAmount,
} from '@/data/mock'

export default function Payments() {
  const totalReceived = getTotalReceivedPayments()
  const pending = getPendingPaymentAmount()
  const lastPayment = payments.find((p) => p.type === 'credit' && p.date)

  const received = payments.filter((p) => p.type === 'credit')
  const pendingList = payments.filter((p) => p.type === 'pending')

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settlements"
        title="Payments"
        description="Claim payouts and pending transfers to your bank account."
        action={
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Download statement
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total received</p>
            <p className="mt-2 text-xl font-semibold font-mono tracking-tight">
              {formatCurrency(totalReceived)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="mt-2 text-xl font-semibold font-mono tracking-tight">
              {formatCurrency(pending)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Last payment</p>
            <p className="mt-2 text-xl font-semibold tracking-tight">
              {lastPayment ? formatDate(lastPayment.date) : '—'}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {lastPayment?.claimReference}
            </p>
          </CardContent>
        </Card>
      </div>

      {pendingList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingList.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium">{p.description}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    {p.policyNumber} · {p.bankName}
                  </p>
                  {p.note && (
                    <p className="text-xs text-muted-foreground mt-1">{p.note}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold">{formatCurrency(p.amount)}</p>
                  <Badge tone="warning" className="mt-1">
                    {p.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment history</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {received.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{p.description}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    {p.claimReference} · {p.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono font-semibold text-foreground">
                  +{formatCurrency(p.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{formatDate(p.date)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
