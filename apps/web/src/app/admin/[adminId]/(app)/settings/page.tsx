import SettingsForm from '@/components/admin/app/settings/settings-form';

export default function AdminSettingsPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Update your admin preferences, appearance, and notifications.
          </p>
        </div>

        <div className="space-y-12">
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}