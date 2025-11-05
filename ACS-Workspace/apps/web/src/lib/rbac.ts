export type Role =
  | "PRESIDENT"
  | "VICE_PRESIDENT"
  | "TREASURER"
  | "EVENT_COORDINATOR"
  | "WEBMASTER"
  | "COMMITTEE_HEAD"
  | "MEDIA_TEAM"
  | "EBOARD";

export function hasAnyRole(userRoles: string[] | undefined, allowed: Role[]) {
  if (!userRoles) return false;
  return allowed.some(r => userRoles.includes(r));
}
