import ContentSection from "@/components/workspace/app/shared/content-section";
import { BillingForm } from "@/components/workspace/app/billing/billing-form";

export default function WorkspaceBillingPage() {
  return (
    <ContentSection
      title="Billing"
      desc="Update your billing information and manage your subscription."
    >
      <BillingForm />
    </ContentSection>
  );
}