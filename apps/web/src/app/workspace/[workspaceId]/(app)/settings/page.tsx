import ContentSection from '@/components/workspace/app/shared/content-section';
import SettingsForm from '@/components/workspace/app/settings/settings-form';

export default function WorkspaceSettingsPage() {
  return (
    <ContentSection
      title='Settings'
      desc='Update your settings.'
    >
      <SettingsForm />
    </ContentSection>
  );
} 