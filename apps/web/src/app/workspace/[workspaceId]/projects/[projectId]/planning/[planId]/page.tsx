import { ProjectPlan } from "@/components/workspace/projects/project/planning/project-plan";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WorkspaceProjectsPlanningPlanPage({ params }: { params: { id: string } }) {
  return <ProjectPlan params={{ id: "1" }} />;
}