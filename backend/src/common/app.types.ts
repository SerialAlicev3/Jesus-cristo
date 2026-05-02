export type UserRole = "admin" | "editor";
export type ContentStatus = "draft" | "pending_approval" | "approved" | "scheduled" | "publishing" | "published" | "failed";
export type MessageTheme = "amor" | "perdao" | "fe" | "compaixao" | "esperanca" | "reflexao";
export type ArtistPermissionStatus = "pending" | "approved" | "rejected";
export type ReelSourceType = "original" | "authorized" | "embed";
export type InstagramPostType = "image" | "reel";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}
