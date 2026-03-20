import { create } from 'zustand';
import type { GameState, Encounter, View, SceneScript } from '../data/schema';
import encountersData from '../data/encounters.json';
import manifestData from '../data/manifest.json';

interface GameStore extends GameState {
  currentView: View;
  previousView: View;
  currentEncounter: Encounter | null;
  currentScene: SceneScript | null;
  selectedLetterId?: string;
  manifest: typeof manifestData;
  
  // Actions
  setView: (view: View) => void;
  setEncounter: (id: string) => void;
  makeChoice: (idx: number) => void;
  travelTo: (locationId: string) => void;
  triggerScene: (id: string) => void;
  saveScene: (scene: SceneScript) => void;
  selectLetter: (id: string) => void;
  healCharacter: (charId: string, itemUsed: string, logic: 'direct' | 'sympathy') => void;
  mixReagents: (id1: string, id2: string) => void;
  buyReagent: (id: string, name: string, quantity: number, price: number) => void;
  sellReagent: (id: string, quantity: number, price: number) => void;
  setStigma: (val: number) => void;
  completePhilology: (id: string, success: boolean) => void;
  resolveVariant: (entityId: string, variantId: string) => void;
  startDirector: (playlist: string[]) => void;
  nextDirectorialScene: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentDay: 1,
  location: "scanderoon",
  currentView: 'intro',
  previousView: 'nav',
  currentEncounter: null,
  currentScene: null,
  selectedLetterId: undefined,
  manifest: manifestData,
  
  stats: {
    honor: 50,
    wealth: 500, // Boosted starting wealth for trade prototype
    spirit: 80,
    stigma: 10,
    knowledge: 5,
    philology: 0,
    reagents: [
        { id: 'vitriol', name: 'Raw Vitriol', quantity: 5, description: 'Acidic salt.' },
        { id: 'nitre', name: 'Nitre', quantity: 10, description: 'Saltpeter.' }
    ]
  },
  
  inventory: ['powder_of_sympathy'],
  unlockedRecipes: [],
  characters: manifestData.characters as any[],
  letters: [
    {
        id: 'letter_allen_1',
        sender_id: 'thomas_allen',
        date: 0,
        subject: 'On the Matter of Your Father',
        content: 'Kenelm, the shadow of 1605 still hangs over the name Digby.',
        read: false,
        impact_stat: 'stigma',
        impact_value: 5
    }
  ],
  log: ["Voyage sequence initiated."],

  // Actions
  setView: (view) => set({ previousView: get().currentView, currentView: view }),
  
  setEncounter: (id) => {
    const enc = (encountersData as Encounter[]).find(e => e.id === id);
    set({ currentEncounter: enc || null });
  },

  makeChoice: (idx) => {
    const choice = get().currentEncounter?.choices[idx];
    if (choice) {
        set(state => ({
            log: [...state.log, `Decision: ${choice.text}`],
            currentEncounter: null
        }));
    }
  },

  travelTo: (locationId) => {
    const loc = get().manifest.locations.find(l => l.id === locationId);
    if (!loc) return;

    set(state => ({
        location: locationId,
        currentDay: state.currentDay + 1,
        stats: { ...state.stats, spirit: Math.max(0, state.stats.spirit - 5) },
        log: [...state.log, `Day ${state.currentDay + 1}: Navigated to ${loc.name}.`]
    }));
  },

  triggerScene: (id) => {
    const scene = (get().manifest.scenes as any[]).find(s => s.id === id);
    if (scene) {
        set({ 
            previousView: get().currentView,
            currentView: 'staging',
            currentScene: scene 
        });
    }
  },

  saveScene: (updatedScene) => {
    set(state => ({
        manifest: {
            ...state.manifest,
            scenes: state.manifest.scenes.map(s => s.id === updatedScene.id ? updatedScene as any : s)
        },
        currentScene: updatedScene
    }));
  },

  selectLetter: (id) => {
    set(state => ({
        selectedLetterId: id,
        letters: state.letters.map(l => l.id === id ? { ...l, read: true } : l)
    }));
  },

  healCharacter: (charId, itemUsed, logic) => {
    set(state => ({
        characters: state.characters.map(c => c.id === charId ? { ...c, health: Math.min(100, c.health + 20) } : c),
        log: [...state.log, `Healed ${charId} via ${logic} application of ${itemUsed}.`]
    }));
  },

  mixReagents: (id1, id2) => {
    const manifest = get().manifest;
    const recipes = (manifest as any).recipes || [];
    
    // Find matching recipe
    const recipe = recipes.find((r: any) => 
        (r.ingredients.includes(id1) && r.ingredients.includes(id2))
    );

    set(state => {
        if (!recipe) {
            return {
                stats: { ...state.stats, knowledge: state.stats.knowledge + 2 },
                log: [...state.log, `Synthesis between ${id1} and ${id2} yielded only charred remains.`]
            };
        }

        const resultReagent = manifest.reagents.find(r => r.id === recipe.result_reagent_id);
        const name = resultReagent?.name || recipe.name;
        
        const existing = state.stats.reagents.find(r => r.id === recipe.result_reagent_id);
        const updatedReagents = existing
            ? state.stats.reagents.map(r => r.id === recipe.result_reagent_id ? { ...r, quantity: r.quantity + 1 } : r)
            : [...state.stats.reagents, { 
                id: recipe.result_reagent_id, 
                name, 
                quantity: 1, 
                description: recipe.description 
              }];

        return {
            stats: { 
                ...state.stats, 
                knowledge: state.stats.knowledge + recipe.knowledge_gain,
                stigma: state.stats.stigma + recipe.stigma_gain,
                reagents: updatedReagents
            },
            log: [...state.log, `GREAT WORK: Successfully synthesized ${name}.`]
        };
    });
  },

  resolveVariant: (reagentId, variantId) => {
    set(state => {
        const reagent = state.manifest.reagents.find(r => r.id === reagentId);
        const variant = reagent?.variant_options?.find((v: any) => v.id === variantId);
        
        if (!variant) return state;

        return {
            stats: { ...state.stats, philology: Math.min(100, state.stats.philology + 20) },
            log: [...state.log, `Resolved manuscript conflict for ${reagentId}: Adopted the ${variant.name} procedure.`]
        };
    });
  },

  buyReagent: (id, name, quantity, price) => {
    const currentWealth = get().stats.wealth;
    if (currentWealth < price) return;

    set(state => {
        const existing = state.stats.reagents.find(r => r.id === id);
        const updatedReagents = existing 
            ? state.stats.reagents.map(r => r.id === id ? { ...r, quantity: r.quantity + quantity } : r)
            : [...state.stats.reagents, { id, name, quantity, description: 'Sourced from Levantine market.' }];

        return {
            stats: {
                ...state.stats,
                wealth: state.stats.wealth - price,
                reagents: updatedReagents
            },
            log: [...state.log, `Purchased ${quantity} units of ${name} for ${price} gold.`]
        };
    });
  },

  sellReagent: (id, quantity, price) => {
    set(state => {
        const existing = state.stats.reagents.find(r => r.id === id);
        if (!existing || existing.quantity < quantity) return state;

        return {
            stats: {
                ...state.stats,
                wealth: state.stats.wealth + price,
                reagents: state.stats.reagents.map(r => r.id === id ? { ...r, quantity: r.quantity - quantity } : r)
            },
            log: [...state.log, `Sold ${quantity} units of ${existing.name} for ${price} gold.`]
        };
    });
  },

  setStigma: (val) => set(state => ({ stats: { ...state.stats, stigma: val } })),

  completePhilology: (id, success) => {
    if (success) {
        set(state => ({
            stats: { ...state.stats, knowledge: state.stats.knowledge + 20 },
            log: [...state.log, `Reconstruction complete: ${id}. Knowledge increased.`]
        }));
    }
  },

  startDirector: (playlist) => {
    set({ directorMode: true, directorPlaylist: playlist });
    const firstSceneId = playlist[0];
    const firstScene = manifestData.scenes.find(s => s.id === firstSceneId);
    if (firstScene) {
      set({ currentScene: firstScene as SceneScript, currentView: 'staging' });
    }
  },

  nextDirectorialScene: () => {
    set(state => {
      if (!state.directorMode || !state.directorPlaylist || state.directorPlaylist.length === 0) {
        return { directorMode: false, currentView: 'gallery' };
      }
      
      const remaining = state.directorPlaylist.slice(1);
      if (remaining.length === 0) {
        return { directorMode: false, currentView: 'gallery', directorPlaylist: [] };
      }
      
      const nextId = remaining[0];
      const nextScene = state.manifest.scenes.find(s => s.id === nextId);
      
      return {
        directorPlaylist: remaining,
        currentScene: (nextScene as SceneScript) || null,
        currentView: nextScene ? 'staging' : 'gallery'
      };
    });
  }
}));
