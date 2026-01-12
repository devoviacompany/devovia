//? =========== App hooks imports ===========
import { useIsMobile } from "./app/use-mobile";
import { useToast } from "./app/use-toast";
import { toast } from "./app/use-toast";

//? =========== Auth hooks imports ===========
import useAuth from "./auth/use-auth";

//? =========== User hooks imports ===========
import useUserId from "./user/use-user-id";

//? =========== Admin hooks imports ===========
import { useAutoRefresh } from "./admin/use-auto-refresh";

//? =========== Developer hooks imports ===========
import { useLoggingSystem } from "./developer/useLoggingSystem";

export {
  // App Hooks
  useIsMobile,
  useToast,
  toast,
  // Auth Hooks
  useAuth,
  // User Hooks
  useUserId,
  // Admin Hooks
  useAutoRefresh,
  // Developer Hooks
  useLoggingSystem,
}