"use client"
import { AccountFormClient } from './account-form-client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AccountForm() {
  // Sane defaults; the client will fetch actual data on mount
  const defaults = {
    name: '',
    email: '',
    avatarUrl: '',
    bio: '',
    dateOfBirth: '',
    address: '',
  } as const

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="px-20">
        <CardTitle>Account details</CardTitle>
        <CardDescription>
          Manage your personal information, contact details, and profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-20">
        <AccountFormClient defaultValues={defaults} />
      </CardContent>
    </Card>
  )
}
