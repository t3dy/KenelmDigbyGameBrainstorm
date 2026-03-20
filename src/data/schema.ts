export interface Reagent {
  id: string;
  name: string;
  description: string;
  properties: {
    potency: number; // 0-100
    instability: number; // 0-100
  };
  historical_context: string;
}

export type View = 'intro' | 'nav' | 'lab' | 'journal' | 'log' | 'editor' | 'staging' | 'philology' | 'market';

export interface Encounter {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  type: 'naval' | 'alchemy' | 'diplomatic' | 'romance';
  stakes: {
    honor: number;
    wealth: number;
    knowledge: number;
  };
  choices: Array<{
    text: string;
    requirement?: string;
    consequence: string;
  }>;
}

export interface Manuscript {
  id: string;
  title: string;
  author: string;
  variants: string[]; // Conflicting recipes/instructions
  true_result: string; // The ID of the reagent it unlocks
}

export interface Character {
  id: string;
  name: string;
  role: 'crew' | 'advisor' | 'rival';
  health: number;
  woundLevel: number; // 0-100
  weapon_id?: string;
  reputation: number; // 0-100
  bio: string;
}

export interface Letter {
  id: string;
  sender_id: string;
  date: number;
  subject: string;
  content: string;
  read: boolean;
  impact_stat?: keyof GameState['stats'];
  impact_value?: number;
}

export interface GameState {
  currentDay: number;
  location: string;
  stats: {
    honor: number;
    wealth: number;
    knowledge: number;
    spirit: number;
    philology: number;
    stigma: number; // Phase 7: Reputation management
    reagents: Array<{ id: string; name: string; quantity: number; description: string; }>;
  };
  inventory: string[];
  characters: Character[];
  letters: Letter[];
  unlockedRecipes: string[];
  log: string[];
  selectedLetterId?: string;
}

export interface SpriteAction {
    type: 'move' | 'emote' | 'say' | 'wait' | 'vanish';
    actorId?: string;
    targetX?: number;
    targetY?: number;
    text?: string;
    duration?: number;
    emotion?: 'surprise' | 'heart' | 'anger' | 'sleep' | 'idea';
}

export interface SceneScript {
    id: string;
    background: 'eagle_deck' | 'milos_refuge' | 'scanderoon_clash' | 'gresham_library';
    actors: Array<{
        id: string;
        startX: number;
        startY: number;
        spriteType: 'digby' | 'venetia' | 'sailor' | 'scholar';
    }>;
    timeline: SpriteAction[];
}
