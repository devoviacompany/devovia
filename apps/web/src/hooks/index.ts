//? =========== App hooks imports ===========
import { useIsMobile } from "./app/use-mobile";
import { useToast } from "./app/use-toast";
import { toast } from "./app/use-toast";

//? =========== Auth hooks imports ===========
import useAuth from "./auth/use-auth";

//? =========== Site hooks imports ===========
import { useTypewriter } from "./site/use-typewriter";
import { useClickOutside } from "./site/use-click-outside";

//? =========== User hooks imports ===========
import useUserId from "./user/use-user-id";

//? =========== Workspace hooks imports ===========
import useWorkspaceId from "./workspace/use-workspace-id";
import useAdminId from "./admin/use-admin-id";

export {
  // App Hooks
  useIsMobile,
  useToast,
  toast,
  // Auth Hooks
  useAuth,
  // Site Hooks
  useTypewriter,
  useClickOutside,
  // User Hooks
  useUserId,
  // Workspace Hooks
  useWorkspaceId,
  // Admin Hooks
  useAdminId,
}