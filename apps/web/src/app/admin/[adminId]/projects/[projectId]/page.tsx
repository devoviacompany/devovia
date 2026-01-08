import { ProjectView } from "@/components/admin/projects/project-view";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    projectId: string;
  }>
}

const Page = async ({ params }: Props) => {
  const { projectId } = await params;

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <ProjectView projectId={projectId} />
    </Suspense>
  )
}

export default Page