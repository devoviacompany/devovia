"use client"
import { BillingFormClient } from './billing-form-client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function BillingForm() {
  const defaults = {
    plan: 'basic',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingEmail: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  } as const

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="px-20">
        <CardTitle>Billing & subscription</CardTitle>
        <CardDescription>
          Manage your payment method, billing details, and subscription plan.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-20">
        <BillingFormClient defaultValues={defaults} />
      </CardContent>
    </Card>
  )
}
