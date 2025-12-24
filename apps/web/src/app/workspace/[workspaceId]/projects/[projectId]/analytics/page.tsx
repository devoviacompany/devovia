import ProjectsContentSection from "@/components/workspace/projects/shared/content-section";
import { ProjectsDashboardSectionCards } from "@/components/workspace/projects/project/dashboard/section-cards"
import { ChartRadialText } from "@/components/workspace/projects/shared/charts/radial/chart-radial-text";
import { ChartPieLabel } from "@/components/workspace/projects/shared/charts/pie/chart-pie-label";
import { ChartTooltipIndicatorLine } from "@/components/workspace/projects/shared/charts/tooltips/chart-tooltip-indicator-line";

import tooltipChartData from "@/components/workspace/projects/project/analytics/data/chart-tooltip-indicator-line.json";
import radialChartData from "@/components/workspace/projects/project/analytics/data/chart-radial-text.json";
import pieChartData from "@/components/workspace/projects/project/analytics/data/chart-pie-label.json";

export default function WorkspaceProjectsAnalyticsPage() {
  return (
    <ProjectsContentSection
      title='Analytics Dashboard'
      desc='See your project analytics dashboard.'
    >
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-5">
            <ProjectsDashboardSectionCards />
            <div className="grid grid-cols-2 gap-4">
              <ChartRadialText data={radialChartData} />
              <ChartPieLabel data={pieChartData} />
            </div>
            <ChartTooltipIndicatorLine data={tooltipChartData} />
          </div>
        </div>
      </div>
    </ProjectsContentSection>
  );
}