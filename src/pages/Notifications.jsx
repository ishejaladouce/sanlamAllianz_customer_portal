import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import { notifications } from '@/data/mock'

const priorityTone = {
  urgent: 'danger',
  high: 'warning',
  normal: 'default',
}

export default function Notifications() {
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description={`${unread} unread message${unread !== 1 ? 's' : ''} requiring your attention.`}
      />

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={!n.read ? 'border-foreground/20' : 'opacity-80'}
          >
            <CardContent className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge tone={priorityTone[n.priority] ?? 'default'}>
                      {n.priority}
                    </Badge>
                    {!n.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDate(n.date, {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              {n.actionLabel && (
                <Button size="sm" variant="outline" className="mt-3">
                  {n.actionLabel}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
