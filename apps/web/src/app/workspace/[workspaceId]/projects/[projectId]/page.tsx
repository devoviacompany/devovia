import ProjectsContentSection from "@/components/workspace/projects/shared/content-section";
import { ProjectsDashboardSectionCards } from "@/components/workspace/projects/project/dashboard/section-cards"

export default function WorkspaceProjectDashboardPage() {
  return (
    <ProjectsContentSection
      title='Dashboard'
      desc='See your project dashboard.'
    >
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-5">
            <ProjectsDashboardSectionCards />
            {/* <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </ProjectsContentSection>
  );
}