// ['draft', 'pending', 'proposed', 'accepted', 'cancelled']
export enum Status {
  draft = 'draft',
  pending = 'pending',
  proposed = 'proposed',
  accepted = 'accepted',
  cancelled = 'cancelled',
}

// ['Mythique', 'Légendaire', 'Épique', 'Rare', 'Commun']
export enum Rarity {
  mythique = 'Mythique',
  legendary = 'Légendaire',
  epic = 'Épique',
  rare = 'Rare',
  common = 'Common',
}

export default class DrawsDTO {
  id: number | null = null
  name: string | null = null
  rarity: Rarity | null = Rarity.common
  data: string | null = null
  status: Status | null = Status.draft
  createdAt: Date | null = null
  updatedAt: Date | null = null
  idUser: number | null = null
}
