import { SupportForm } from '@/components/workspace/app/support/support-form';
import { SupportList } from '@/components/workspace/app/support/support-list';

export default function WorkspaceSupportPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
        <p className="text-muted-foreground">
          Get help with NFC card operations, account issues, and more.
        </p>
      </div>

      <div className="space-y-12">
        <SupportForm />
      </div>

      <SupportList />

      {/* <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Can&apos;t find what you&apos;re looking for? Email us at <a href="mailto:devoviacompany@gmail.com" className="text-primary hover:underline">support@devovia.com</a></p>
      </div> */}

      <div className="mt-8 rounded-lg border bg-muted/50 p-6 text-center">
        <p>Can&apos;t find what you&apos;re looking for? Email us at <a href="mailto:devoviacompany@gmail.com" className="text-primary hover:underline">support@devovia.com</a></p>
      </div>
    </div>
    </div>
  );
}