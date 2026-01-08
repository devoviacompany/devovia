"use client";

import { useParams } from "next/navigation";
import { useAuthContextOptional } from "@/context/auth/auth-context";

const useAdminId = () => {
  const params = useParams();
  const auth = useAuthContextOptional();
  const adminId = auth?.user?._id;
  return (adminId as string) || (params.adminId as string) || "";
};

export default useAdminId;
