// src/app/types/champions.ts

// Definición de tipos para campeones
export interface Champion {
  id: string;
  name: string;
  title: string;
  lore?: string;
  image?: string;
  tags?: string[];
  blurb?: string; 
}

// Detalle extendido del campeón
export interface ChampionDetail extends Champion {
  lore: string;
  tags: string[];
  stats: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
    [key: string]: number;
  };
}

// Respuesta de la API para todos los campeones
export interface ChampionDetailResponse {
  data: {
    [key: string]: ChampionDetail;
  };
}
