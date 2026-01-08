import { BillingForm } from "@/components/admin/app/billing/billing-form";

export default function AdminBillingPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Update your billing information and manage your subscription.
          </p>
        </div>

        <div className="space-y-12">
          <BillingForm />
        </div>
      </div>
    </div>
  );
}