export const Permissions = {
  // The permission for developers
} as const;

export type PermissionType = keyof typeof Permissions;
