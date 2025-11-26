"use client";

import { useParams } from "next/navigation";
import { useAuthContextOptional } from "@/context/auth/auth-context";

const useWorkspaceId = () => {
  const params = useParams();
  const auth = useAuthContextOptional();
  const workspaceId = auth?.user?._id;
  return (workspaceId as string) || (params.workspaceId as string) || "";
};

export default useWorkspaceId;
