import AccountForm from '@/components/admin/app/account/account-form';

export default function AdminAccountPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Account</h1>
          <p className="text-muted-foreground">
            Update your profile information, email, and other account details.
          </p>
        </div>

        <div className="space-y-12">
          <AccountForm />
        </div>
      </div>
    </div>
  );
}
