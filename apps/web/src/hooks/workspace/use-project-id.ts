"use client";

import { useParams } from "next/navigation";
import { useAuthContextOptional } from "@/context/auth/auth-context";

const useProjectId = () => {
  const params = useParams();
  const auth = useAuthContextOptional();
  const projectId = auth?.user?._id;
  return (projectId as string) || (params.projectId as string) || "";
};

export default useProjectId;
