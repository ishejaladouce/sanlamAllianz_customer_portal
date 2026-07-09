import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Lock, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Switch } from '@/components/ui/Switch'
import { useAuthStore } from '@/stores/authStore'
import { banking } from '@/data/mock'
import { cn, formatDate } from '@/lib/utils'

const tabs = ['Profile', 'Banking', 'Notifications', 'Security']

export default function Profile() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const setAuth = useAuthStore((s) => s.setAuth)
  const token = useAuthStore((s) => s.token)
  const [activeTab, setActiveTab] = useState('Profile')
  const [language, setLanguage] = useState(user?.language ?? 'en')
  const [notifPrefs, setNotifPrefs] = useState({
    sms: true,
    email: true,
    portal: true,
  })
  const [twoFa, setTwoFa] = useState(false)

  const saveLanguage = async () => {
    await new Promise((r) => setTimeout(r, 300))
    setAuth({ ...user, language }, token)
    toast.success('Portal language updated')
  }

  const readonlyFields = [
    { label: 'Legal name', value: user?.name },
    { label: 'Display name', value: user?.displayName },
    { label: 'National ID', value: user?.nationalId, mono: true },
    { label: 'Date of birth', value: user?.dateOfBirth ? formatDate(user.dateOfBirth) : '—' },
    { label: 'Phone', value: user?.phone, mono: true },
    { label: 'Email', value: user?.email },
    { label: 'Address', value: user?.address, span: true },
    { label: 'District', value: user?.district },
    { label: 'Sector', value: user?.sector },
  ]

  return (
    <div className="space-y-8 max-w-3xl">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Manage your personal details, banking, notifications and security."
      />

      <div className="flex gap-1 overflow-x-auto border-b border-border pb-px">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
              activeTab === tab
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Profile' && (
        <>
          <Card>
            <CardContent className="flex flex-wrap items-center gap-5 p-6">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-lg font-semibold shrink-0">
                {user?.initials ?? 'JR'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold">{user?.displayName}</p>
                <p className="text-sm text-muted-foreground font-mono">{user?.nationalId}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user?.address} · {user?.district}
                </p>
              </div>
              <Badge tone="outline" className="gap-1.5 shrink-0">
                <Lock className="h-3 w-3" />
                On record
              </Badge>
            </CardContent>
          </Card>

          <div className="flex gap-3 rounded-xl border border-border/60 bg-secondary/50 px-4 py-3.5 text-[13px] leading-relaxed text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-foreground" />
            <div className="space-y-2">
              <p>
                Personal details are held on your policy records and cannot be changed directly in
                the portal. Updates to your National ID, legal name, address, phone or email require
                verification and approval by SanlamAllianz.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="bg-card"
                onClick={() => navigate('/services')}
              >
                Request a profile update
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal information</CardTitle>
              <CardDescription>
                As registered with SanlamAllianz — view only.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {readonlyFields.map((field) => (
                <div
                  key={field.label}
                  className={cn(field.span && 'sm:col-span-2')}
                >
                  <Label className="text-muted-foreground">{field.label}</Label>
                  <Input
                    value={field.value ?? '—'}
                    readOnly
                    disabled
                    className={cn(
                      'mt-1.5 bg-secondary/50 cursor-not-allowed opacity-100',
                      field.mono && 'font-mono',
                    )}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portal preferences</CardTitle>
              <CardDescription>
                Settings that apply only to this customer portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">Display language</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: 'en', label: '🇬🇧 English' },
                    { code: 'fr', label: '🇫🇷 Français' },
                    { code: 'rw', label: '🇷🇼 Kinyarwanda' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLanguage(lang.code)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                        language === lang.code
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={saveLanguage}>Save language</Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'Banking' && (
        <div className="space-y-4">
          <div className="flex gap-3 rounded-xl border border-border/60 bg-secondary/50 px-4 py-3.5 text-[13px] leading-relaxed text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-foreground" />
            <p>
              Bank details for claim payouts are verified against your policy. To change your
              account, submit a service request with a bank letter or stamped bank statement.
            </p>
          </div>
          <Card>
          <CardHeader>
            <CardTitle>Bank account</CardTitle>
            <CardDescription>Used for claim payouts and refunds.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  Bank name
                </p>
                <p className="font-medium">{banking.bankName}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  Account number
                </p>
                <p className="font-mono font-medium">{banking.accountNumber}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  Account holder
                </p>
                <p className="font-medium">{banking.accountHolder}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  Swift code
                </p>
                <p className="font-mono">{banking.swiftCode}</p>
              </div>
              <div className="flex items-end">
                {banking.verified ? (
                  <Badge tone="success">Verified</Badge>
                ) : (
                  <Button size="sm">Verify account</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      )}

      {activeTab === 'Notifications' && (
        <Card>
          <CardHeader>
            <CardTitle>Notification preferences</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {[
              { key: 'sms', label: 'SMS alerts', desc: 'Claim status and urgent policy alerts' },
              { key: 'email', label: 'Email notifications', desc: 'Statements and monthly summaries' },
              { key: 'portal', label: 'Portal notifications', desc: 'In-app updates and reminders' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifPrefs[item.key]}
                  onCheckedChange={(value) =>
                    setNotifPrefs((p) => ({ ...p, [item.key]: value }))
                  }
                  aria-label={item.label}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === 'Security' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="flex items-center justify-between p-6 gap-4">
              <div>
                <p className="text-sm font-medium">Sign-in method</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  You sign in with your National ID and a one-time code sent to your registered
                  mobile. To change your registered number, use a profile update request.
                </p>
              </div>
              <Badge tone="outline">National ID + OTP</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium">Two-factor authentication</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={twoFa}
                onCheckedChange={setTwoFa}
                aria-label="Two-factor authentication"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
