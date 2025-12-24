import ContentSection from '@/components/workspace/app/shared/content-section';
import AccountForm from '@/components/workspace/app/account/account-form';

export default function WorkspaceAccountPage() {
  return (
    <ContentSection
      title='Account'
      desc='Update your account settings. Set your preferred language and
            timezone.'
    >
      <AccountForm />
    </ContentSection>
  );
}
