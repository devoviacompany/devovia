import { ChartAreaInteractive } from "@/components/workspace/projects/shared/charts/area/chart-area-interactive"
import { DataTable } from "@/components/workspace/home/data-table"
import { SectionCards } from "@/components/workspace/home/section-cards"

import data from "@/components/workspace/home/data/table-data.json"
import dataArea from "@/components/workspace/home/data/chart-area-interactive-data.json"

export default function WorkspaceHomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive data={dataArea} />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}