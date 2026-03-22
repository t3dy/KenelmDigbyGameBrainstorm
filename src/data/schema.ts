export interface Reagent {
  id: string;
  name: string;
  description: string;
  properties?: {
    potency: number; // 0-100
    instability: number; // 0-100
  };
  historical_context?: string;
  iconId?: string;
  variant_options?: any[];
}

export interface CombatVessel {
    id: string;
    name: string;
    hull: number;
    maxHull: number;
    components: Array<{ id: string, name: string, health: number }>;
}

export interface ShipComponent {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  efficiency: number;
}

export interface PursuerState {
  id: string;
  name: string;
  x: number;
  y: number;
  active: boolean;
  speed: number;
}

export type View = 'intro' | 'nav' | 'lab' | 'journal' | 'log' | 'editor' | 'staging' | 'philology' | 'market' | 'gallery' | 'showcase' | 'combat' | 'intrigue' | 'port' | 'ship_combat' | 'kit';

export interface Encounter {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  type: string;
  assetId?: string; // Reference to Almagest Asset Layer
  provenance?: string; // Reference to Source Note ID (e.g. SPIRIT_VISION_1622)
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
  participants?: Array<{
      id: string;
      name: string;
      hp: number;
      maxHp: number;
      side: 'player' | 'enemy';
      spriteType: 'digby' | 'venetia' | 'sailor' | 'scholar';
  }>;
  vessel?: CombatVessel;
}

export interface Recipe {
    id: string;
    ingredients: string[];
    result_reagent_id: string;
    description: string;
    knowledge_gain: number;
    stigma_gain: number;
    unlocked?: boolean;
}

export interface Manuscript {
  id: string;
  title: string;
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
    // 🏛️ Resources (FTL-Lineage / Renaissance Feasiblity)
    wealth: number;
    knowledge: number;
    spirit: number;
    patronage: number; // New: 1600s State Status
    philology: number;
    // 📉 Reputation (Ultima-Lineage)
    stigma: number; 
    honor: number;
    reagents: Array<{ id: string; name: string; quantity: number; description: string; potency?: number; }>;
    resolvedReagentIds: string[];
  };
  inventory: string[];
  characters: Character[];
  letters: Letter[];
  unlockedRecipes: string[];
  log: string[];
  selectedLetterId?: string;
  directorMode?: boolean;
  directorPlaylist?: string[];
}

export interface SpriteAction {
    type: string;
    actorId?: string;
    targetX?: number;
    targetY?: number;
    text?: string;
    duration?: number;
    emotion?: 'surprise' | 'heart' | 'anger' | 'sleep' | 'idea';
}

export type AlmagestBackground = 'eagle_deck' | 'milos_refuge' | 'scanderoon_clash' | 'gresham_library' | 'london_studio' | 'christ_church' | 'florence_court' | 'algiers_port' | 'med_sea_passage';
export type AlmagestJurisdiction = 'ottoman' | 'venetian' | 'english' | 'papal' | 'neutral';
export type AlmagestSprite = 'digby' | 'venetia' | 'sailor' | 'scholar' | 'spirit' | 'official';

export interface SceneScript {
    id: string;
    background: string;
    actors: Array<{
        id: string;
        startX: number;
        startY: number;
        spriteType: string;
    }>;
    timeline: SpriteAction[];
}

export interface ChronoSchedule {
    id: string;
    frequency: 'daily' | 'weekly' | 'lunar' | 'once';
    trigger_date?: string;
    action_id: string; // References EncounterID or SceneID
    type: 'mandatory' | 'opportunity' | 'passive';
}

export interface FleetLocation {
    id: string;
    name: string;
    x: number;
    y: number;
    description: string;
    type: string;
    unlocked: boolean;
    provenance?: string; // Reference to Source Note ID
    jurisdiction?: any;
    port_config?: any;
}

export interface AlmagestManifest {
    id?: string;
    description?: string;
    governance?: {
        scholarly_coverage: number; // 0-100 percentage
        last_audit: string;
        unprovenanced_count: number;
    };
    reagents: Reagent[];
    locations: FleetLocation[];
    recipes: Recipe[];
    scenes: SceneScript[];
    encounters: Encounter[];
    chrono_schedule?: ChronoSchedule[];
    combat_moves?: CombatMove[];
    lineage?: string;
    reputation_axes?: string[];
    markets?: Record<string, any>;
    assets?: Record<string, { icon: string, color: string, pixels?: number[][] }>;
}

export interface CombatMove {
  id: string;
  name: string;
  type: 'attack' | 'heal' | 'debuff' | 'buff';
  damage?: number;
  power?: number;
  reagent_cost?: Record<string, number>;
  message: string;
  icon?: string;
  charge_time?: number;
  component_damage?: number;
}
