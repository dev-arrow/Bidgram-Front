import type { Metadata } from 'next'
import { SettingsView } from '@/components/setting/settings-view'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Settings — Bidgram',
  description: 'Manage your account, bidding limits, AI defaults, notifications, and security.',
}

export default function SettingPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Account details, bidding limits, and the guardrails Bidgram applies on your behalf."
      />

      <div className="px-6 py-6 lg:px-8">
        <SettingsView />
      </div>
    </>
  )
}
