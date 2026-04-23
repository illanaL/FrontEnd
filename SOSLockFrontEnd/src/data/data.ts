import type { ClientRequest } from "../features/clientRequests/clientRequest.types";

export const StatusRequest = {
  PENDING : "PENDING",
  ASSIGNED : "ASSIGNED",
  COMPLETED : "COMPLETED",
  CANCELLED : "CANCELLED",
  EXPIRED : "EXPIRED",
} as const;
export type StatusRequest = typeof StatusRequest[keyof typeof StatusRequest];


// À ajouter à la fin de ton data.ts existant

// Record : mapping status → label affiché
export const STATUS_LABELS: Record<StatusRequest, string> = {
  PENDING: "En attente",
  ASSIGNED: "En cours",
  COMPLETED: "Terminée",
  CANCELLED: "Annulée",
  EXPIRED: "Expirée",
};

// Record : mapping status → couleur badge
export const STATUS_COLORS: Record<StatusRequest, "yellow" | "blue" | "green" | "red" | "gray"> = {
  PENDING: "yellow",
  ASSIGNED: "blue",
  COMPLETED: "green",
  CANCELLED: "red",
  EXPIRED: "gray",
};

// Pick : ce qu'on affiche dans la liste/carte — pas besoin de phone/email/userId
export type ClientRequestCard = Pick<ClientRequest,
  "id" | "firstName" | "lastName" | "description" | "isUrgent" | "status" | "createdAt" | "addressRequest">;

// Omit : vue détail — on exclut les champs techniques internes
export type ClientRequestDetail = Omit<ClientRequest, "userId" | "artisanId">;

// Tri et vue
export type SortBy = "date" | "name" | "status";
export type ViewMode = "grid" | "list";