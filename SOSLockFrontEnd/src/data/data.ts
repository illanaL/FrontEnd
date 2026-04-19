
export const StatusRequest = {
  PENDING : "PENDING",
  ASSIGNED : "ASSIGNED",
  COMPLETED : "COMPLETED",
  CANCELLED : "CANCELLED",
  EXPIRED : "EXPIRED",
} as const;
export type StatusRequest = typeof StatusRequest[keyof typeof StatusRequest];

export interface MockClientRequest {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressRequest: {
    number: string;
    street: string;
    zipCode: string;
    city: string;
  };
  description: string;
  isUrgent: boolean;
  isProfessional: boolean;
  status: StatusRequest;
  preferredDate?: Date;
  createdAt: Date;
  artisanId?: string;
}

export const mockClientRequest: MockClientRequest[] = [
  {
    id: "1",
    userId: "u1",
    firstName: "Ghislaine",
    lastName: "LAHIANY",
    phone: "0612345678",
    email: "ghislaine@mail.fr",
    addressRequest: { number: "11", street: "allée des Magnolias", zipCode: "93250", city: "Villemomble" },
    description: "Porte claquée suite à un courant d'air, clés sur la serrure",
    isUrgent: true,
    isProfessional: false,
    status: StatusRequest.PENDING,
    createdAt: new Date("2026-04-19"),
  },
  {
    id: "2",
    userId: "u2",
    firstName: "Jean-Pierre",
    lastName: "MARCIANO",
    phone: "0698765432",
    email: "jpmarciano@mail.fr",
    addressRequest: { number: "5", street: "rue de la Paix", zipCode: "75001", city: "Paris" },
    description: "Volet roulant bloqué fermé, impossible de l'ouvrir",
    isUrgent: false,
    isProfessional: false,
    status: StatusRequest.PENDING,
    preferredDate: new Date("2026-04-21"),
    createdAt: new Date("2026-04-19"),
  },
  {
    id: "3",
    userId: "u3",
    firstName: "Syndic",
    lastName: "Les Floralies",
    phone: "0145678901",
    email: "syndic.floralies@mail.fr",
    addressRequest: { number: "3", street: "avenue des Roses", zipCode: "93220", city: "Gagny" },
    description: "Mise en place d'un digicode pour l'entrée de l'immeuble",
    isUrgent: false,
    isProfessional: true,
    status: StatusRequest.PENDING,
    createdAt: new Date("2026-04-18"),
  },
  {
    id: "4",
    userId: "u4",
    firstName: "Sophie",
    lastName: "MARTIN",
    phone: "0678901234",
    email: "s.martin@mail.fr",
    addressRequest: { number: "8", street: "boulevard Voltaire", zipCode: "75011", city: "Paris" },
    description: "Installation serrure connectée Yale sur porte blindée existante",
    isUrgent: false,
    isProfessional: false,
    status: StatusRequest.ASSIGNED,
    artisanId: "aced8db0-ba12-475f-9cd3-9b989f2fa1e3",
    createdAt: new Date("2026-04-17"),
  },
  {
    id: "5",
    userId: "u5",
    firstName: "Paul",
    lastName: "RENARD",
    phone: "0654321098",
    email: "p.renard@mail.fr",
    addressRequest: { number: "2", street: "rue des Lilas", zipCode: "93100", city: "Montreuil" },
    description: "Remplacement cylindre suite à perte de clé",
    isUrgent: true,
    isProfessional: false,
    status: StatusRequest.ASSIGNED,
    artisanId: "aced8db0-ba12-475f-9cd3-9b989f2fa1e3",
    createdAt: new Date("2026-04-18"),
  },
  {
    id: "6",
    userId: "u6",
    firstName: "Marie",
    lastName: "DURAND",
    phone: "0623456789",
    email: "m.durand@mail.fr",
    addressRequest: { number: "15", street: "rue Victor Hugo", zipCode: "93300", city: "Aubervilliers" },
    description: "Blindage de porte d'entrée, appartement au rez-de-chaussée",
    isUrgent: false,
    isProfessional: false,
    status: StatusRequest.ASSIGNED,
    artisanId: "aced8db0-ba12-475f-9cd3-9b989f2fa1e3",
    createdAt: new Date("2026-04-16"),
  },
  {
    id: "7",
    userId: "u7",
    firstName: "Ahmed",
    lastName: "BENALI",
    phone: "0667890123",
    email: "a.benali@mail.fr",
    addressRequest: { number: "22", street: "rue Gambetta", zipCode: "93400", city: "Saint-Ouen" },
    description: "Ouverture coffre-fort, combinaison oubliée",
    isUrgent: false,
    isProfessional: false,
    status: StatusRequest.COMPLETED,
    artisanId: "aced8db0-ba12-475f-9cd3-9b989f2fa1e3",
    createdAt: new Date("2026-04-10"),
  },
  {
    id: "8",
    userId: "u8",
    firstName: "Lucie",
    lastName: "PETIT",
    phone: "0634567890",
    email: "l.petit@mail.fr",
    addressRequest: { number: "7", street: "impasse des Acacias", zipCode: "93600", city: "Aulnay-sous-Bois" },
    description: "Remplacement serrure multipoints après tentative de cambriolage",
    isUrgent: true,
    isProfessional: false,
    status: StatusRequest.COMPLETED,
    artisanId: "aced8db0-ba12-475f-9cd3-9b989f2fa1e3",
    createdAt: new Date("2026-04-08"),
  },
  {
    id: "9",
    userId: "u9",
    firstName: "Robert",
    lastName: "GARCIA",
    phone: "0645678901",
    email: "r.garcia@mail.fr",
    addressRequest: { number: "1", street: "rue de la Mairie", zipCode: "93700", city: "Drancy" },
    description: "Installation interphone avec caméra pour maison individuelle",
    isUrgent: false,
    isProfessional: false,
    status: StatusRequest.COMPLETED,
    artisanId: "aced8db0-ba12-475f-9cd3-9b989f2fa1e3",
    createdAt: new Date("2026-04-05"),
  },
  {
    id: "10",
    userId: "u10",
    firstName: "Isabelle",
    lastName: "MOREAU",
    phone: "0656789012",
    email: "i.moreau@mail.fr",
    addressRequest: { number: "30", street: "avenue de la République", zipCode: "93200", city: "Saint-Denis" },
    description: "Dépannage urgent : locataire bloqué dehors, clé cassée dans la serrure",
    isUrgent: true,
    isProfessional: false,
    status: StatusRequest.COMPLETED,
    artisanId: "aced8db0-ba12-475f-9cd3-9b989f2fa1e3",
    createdAt: new Date("2026-04-02"),
  },
  {
    id: "11",
    userId: "u11",
    firstName: "Thomas",
    lastName: "LEROY",
    phone: "0689012345",
    email: "t.leroy@mail.fr",
    addressRequest: { number: "12", street: "rue du Commerce", zipCode: "93500", city: "Pantin" },
    description: "Mise en place contrôle d'accès badge pour local commercial",
    isUrgent: false,
    isProfessional: true,
    status: StatusRequest.PENDING,
    preferredDate: new Date("2026-04-25"),
    createdAt: new Date("2026-04-19"),
  },
  {
    id: "12",
    userId: "u12",
    firstName: "Nathalie",
    lastName: "SIMON",
    phone: "0612398765",
    email: "n.simon@mail.fr",
    addressRequest: { number: "4", street: "allée des Cèdres", zipCode: "93340", city: "Le Raincy" },
    description: "Portail électrique bloqué, télécommande hors service",
    isUrgent: false,
    isProfessional: false,
    status: StatusRequest.CANCELLED,
    createdAt: new Date("2026-04-14"),
  },
  {
    id: "13",
    userId: "u13",
    firstName: "François",
    lastName: "LAMBERT",
    phone: "0623119988",
    email: "f.lambert@mail.fr",
    addressRequest: { number: "18", street: "rue Pasteur", zipCode: "93800", city: "Épinay-sur-Seine" },
    description: "Remplacement serrure ancienne modèle, porte de cave",
    isUrgent: false,
    isProfessional: false,
    status: StatusRequest.EXPIRED,
    createdAt: new Date("2026-03-30"),
  },
  {
    id: "14",
    userId: "u14",
    firstName: "Caroline",
    lastName: "MICHEL",
    phone: "0634112233",
    email: "c.michel@mail.fr",
    addressRequest: { number: "9", street: "rue des Écoles", zipCode: "93150", city: "Le Blanc-Mesnil" },
    description: "Serrure de porte-fenêtre grippée, impossible de verrouiller",
    isUrgent: true,
    isProfessional: false,
    status: StatusRequest.PENDING,
    createdAt: new Date("2026-04-19"),
  },
  {
    id: "15",
    userId: "u15",
    firstName: "David",
    lastName: "FONTAINE",
    phone: "0645990011",
    email: "d.fontaine@mail.fr",
    addressRequest: { number: "6", street: "square des Tilleuls", zipCode: "93380", city: "Pierrefitte-sur-Seine" },
    description: "Installation alarme anti-intrusion connectée, maison neuve",
    isUrgent: false,
    isProfessional: false,
    status: StatusRequest.ASSIGNED,
    artisanId: "aced8db0-ba12-475f-9cd3-9b989f2fa1e3",
    createdAt: new Date("2026-04-15"),
  },
];

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
export type ClientRequestCard = Pick<MockClientRequest,
  "id" | "firstName" | "lastName" | "description" | "isUrgent" | "status" | "createdAt" | "addressRequest">;

// Omit : vue détail — on exclut les champs techniques internes
export type ClientRequestDetail = Omit<MockClientRequest, "userId" | "artisanId">;

// Tri et vue
export type SortBy = "date" | "name" | "status";
export type ViewMode = "grid" | "list";