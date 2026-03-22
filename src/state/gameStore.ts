import { create } from 'zustand';
import type { GameState, Encounter, View, SceneScript, ShipComponent, PursuerState, Reagent, AlmagestManifest } from '../data/schema';
import encountersData from '../data/encounters.json';
import manifestData from '../data/manifest.json';

interface GameStore extends GameState {
  currentView: View;
  previousView: View;
  currentEncounter: Encounter | null;
  currentScene: SceneScript | null;
  selectedLetterId?: string;
  manifest: AlmagestManifest;
  pendingCuration: any;
  curateRomance: (choiceIdx: number) => void;
  currentProjectSlug: string | null;
  corpus: any[];
  loadCorpus: () => Promise<void>;

  // Ship & Engine Additions
  ship: {
    hull: number;
    maxHull: number;
    components: ShipComponent[];
    x: number;
    y: number;
    targetX?: number;
    targetY?: number;
    destinationId?: string;
    cargo: Array<{ id: string, name: string, quantity: number, weight: number }>;
    maxCargo: number;
  };
  pursuer: PursuerState;
  
  // Actions
  setView: (view: View) => void;
  loadProjectManifest: (slug: string) => Promise<void>;
  setEncounter: (id: string) => void;
  makeChoice: (idx: number) => void;
  travelTo: (locationId: string) => void;
  triggerScene: (id: string) => void;
  saveScene: (scene: SceneScript) => void;
  saveLocationConfig: (locationId: string, config: any) => void;
  saveEncounters: (encounters: Encounter[]) => void;
  saveAsset: (id: string, config: { icon: string, color: string, pixels?: number[][] }) => void;
  updateReagent: (id: string, updates: Partial<Reagent>) => void;
  selectLetter: (id: string) => void;
  healCharacter: (charId: string, itemUsed: string, logic: 'direct' | 'sympathy') => void;
  mixReagents: (id1: string, id2: string, quality?: number) => void;
  buyReagent: (id: string, name: string, quantity: number, price: number) => void;
  sellReagent: (id: string, quantity: number, price: number) => void;
  setStigma: (val: number) => void;
  completePhilology: (id: string, success: boolean) => void;
  resolveVariant: (entityId: string, variantId: string) => void;
  startDirector: (playlist: string[]) => void;
  nextDirectorialScene: () => void;
  addLog: (entry: string) => void;

  consumeReagents: (costs: Record<string, number>) => void;
  // Engine Actions
  tick: () => void;
  setShipCoords: (x: number, y: number) => void;
  escalatePursuit: (amount: number) => void;
  damageComponent: (id: string, amount: number) => void;
  repairShipComponent: (id: string, amount: number) => void;
  gainWealth: (amount: number) => void;
  addReagent: (id: string, quantity: number, potency?: number) => void;
  gainKnowledge: (amount: number) => void;
  addEntitiesToManifest: (entities: { reagents?: Reagent[], locations?: any[], encounters?: Encounter[] }) => void;
  saveManifest: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentDay: 1,
  location: "scanderoon",
  currentView: 'kit',
  previousView: 'nav',
  currentEncounter: null,
  currentScene: null,
  selectedLetterId: undefined,
  manifest: manifestData || { 
    reagents: [], locations: [], recipes: [], scenes: [], encounters: [], markets: {}, assets: {} 
  },
  currentProjectSlug: null,
  corpus: [],
  pendingCuration: null,
  curateRomance: () => {},
  
  // INITIAL SHIP STATE
  ship: {
    hull: 100,
    maxHull: 100,
    x: 88,
    y: 42,
    targetX: undefined,
    targetY: undefined,
    destinationId: undefined,
    components: [
        { id: 'masts', name: 'Main Masts', health: 100, maxHealth: 100, efficiency: 1.0 },
        { id: 'athanor', name: 'Alchemical Athanor', health: 80, maxHealth: 100, efficiency: 1.0 },
        { id: 'galley', name: 'Crew Quarters', health: 100, maxHealth: 100, efficiency: 1.0 }
    ],
    cargo: [
        { id: 'persian_silk', name: 'Persian Raw Silk', quantity: 2, weight: 10 }
    ],
    maxCargo: 500
  },
  
  // INITIAL PURSUER STATE
  pursuer: {
    id: 'venetian_galley',
    name: 'The Serene Pursuer',
    x: 90,
    y: 10,
    active: false,
    speed: 0.2
  },

  stats: {
    wealth: 500,
    knowledge: 5,
    spirit: 80,
    patronage: 50,
    philology: 20,
    stigma: 10,
    honor: 50,
    reagents: [
        { id: "vitriol", name: "Calcined Vitriol", quantity: 5, description: "Raw vitriol for experimentation." },
        { id: 'nitre', name: 'Nitre', quantity: 10, description: 'Saltpeter.' }
    ],
    resolvedReagentIds: []
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

    // Initiate sailing sequence
    set(state => ({
        log: [...state.log, `WEIGH ANCHOR: Preparing passage to ${loc.name}.`],
        // We set the target but DON'T update location yet
        ship: {
            ...state.ship,
            targetX: loc.x,
            targetY: loc.y,
            destinationId: locationId
        }
    }));
  },

  addLog: (entry) => set(state => ({ log: [...state.log, entry] })),

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

  saveLocationConfig: (id, config) => {
    set(state => ({
        manifest: {
            ...state.manifest,
            locations: state.manifest.locations.map(l => l.id === id ? { ...l, port_config: config } : l)
        }
    }));
  },

  saveEncounters: (encounters: any[]) => {
    set(state => ({
        manifest: {
            ...state.manifest,
            encounters: encounters
        }
    }));
  },

  saveAsset: (id: string, config: any) => {
    set(state => ({
        manifest: {
            ...state.manifest,
            assets: {
                ...((state.manifest as any).assets || {}),
                [id]: config
            }
        }
    }));
  },

  updateReagent: (id: string, updates: Partial<Reagent>) => {
    set(state => ({
        manifest: {
            ...state.manifest,
            reagents: state.manifest.reagents.map(r => r.id === id ? { ...r, ...updates } : r)
        }
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

  mixReagents: (id1, id2, quality = 1) => {
    const manifest = get().manifest;
    const recipes = (manifest as any).recipes || [];
    
    // Find matching recipe
    const recipe = recipes.find((r: any) => 
        (r.ingredients.includes(id1) && r.ingredients.includes(id2))
    );

    set(state => {
        // First, consume the ingredients
        const consumedReagents = state.stats.reagents.map(r => {
            if (r.id === id1 || r.id === id2) {
                return { ...r, quantity: Math.max(0, r.quantity - 1) };
            }
            return r;
        }).filter(r => r.quantity > 0 || r.id === id1 || r.id === id2);

        if (!recipe) {
            return {
                stats: { 
                    ...state.stats, 
                    knowledge: state.stats.knowledge + 2,
                    reagents: consumedReagents
                },
                log: [...state.log, `Synthesis between ${id1} and ${id2} failed (Lack of proportion).`]
            };
        }

        const resultReagent = manifest.reagents.find(r => r.id === recipe.result_reagent_id);
        const name = resultReagent?.name || recipe.name;
        
        // Calculate potency based on synthesis quality
        const potency = Math.floor(quality * 100);
        
        const existing = consumedReagents.find(r => r.id === recipe.result_reagent_id);
        const updatedReagents = existing
            ? consumedReagents.map(r => r.id === recipe.result_reagent_id ? { ...r, quantity: r.quantity + 1, potency: Math.max(r.potency || 0, potency) } : r)
            : [...consumedReagents, { 
                id: recipe.result_reagent_id, 
                name, 
                quantity: 1, 
                description: recipe.description,
                potency
              }];

        return {
            stats: { 
                ...state.stats, 
                knowledge: state.stats.knowledge + recipe.knowledge_gain,
                stigma: state.stats.stigma + recipe.stigma_gain,
                reagents: updatedReagents
            },
            log: [...state.log, `SYNTESIS SUCCESS: Produced ${name} at ${potency}% potency.`]
        };
    });
  },

  resolveVariant: (reagentId, variantId) => {
    set(state => {
        const reagent = state.manifest.reagents.find(r => r.id === reagentId);
        const variant = reagent?.variant_options?.find((v: any) => v.id === variantId);
        
        if (!variant) return state;

        const alreadyResolved = state.stats.resolvedReagentIds.includes(reagentId);

        return {
            stats: { 
                ...state.stats, 
                philology: Math.min(100, state.stats.philology + 20),
                resolvedReagentIds: alreadyResolved 
                    ? state.stats.resolvedReagentIds 
                    : [...state.stats.resolvedReagentIds, reagentId]
            },
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
  },

  consumeReagents: (costs) => {
    set(state => ({
        stats: {
            ...state.stats,
            reagents: state.stats.reagents.map(r => {
                const cost = costs[r.id] || 0;
                return { ...r, quantity: Math.max(0, r.quantity - cost) };
            })
        }
    }));
  },

  // Kernel Engine Actions
  tick: () => {
    const state = get();
    
    // Handle Ship Movement
    if (state.ship.targetX !== undefined && state.ship.targetY !== undefined) {
        const dx = state.ship.targetX - state.ship.x;
        const dy = state.ship.targetY - state.ship.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 1) {
            // Arrived
            set(state => ({
                location: state.ship.destinationId || state.location,
                currentDay: state.currentDay + 1,
                stats: { ...state.stats, spirit: Math.max(0, state.stats.spirit - 5) },
                ship: { ...state.ship, targetX: undefined, targetY: undefined, destinationId: undefined },
                log: [...state.log, `ARRIVAL: Dropped anchor at ${state.manifest.locations.find(l => l.id === state.ship.destinationId)?.name}.`]
            }));
        } else {
            const speed = 1.5; // Constant sailing speed
            set(state => ({
                ship: {
                    ...state.ship,
                    x: state.ship.x + (dx / dist) * speed,
                    y: state.ship.y + (dy / dist) * speed
                }
            }));
        }
    }

    // Handle Pursuer Movement (Driven by Stigma)
    const isActive = state.stats.stigma > 20 || state.currentDay > 5;
    if (!isActive) return;
    
    const pTargetX = state.ship.x;
    const pTargetY = state.ship.y;
    
    const pdx = pTargetX - state.pursuer.x;
    const pdy = pTargetY - state.pursuer.y;
    const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
    
    if (pdist < 1) return; 

    const pursuitSpeed = 0.15 + (state.stats.stigma / 150) + (state.currentDay * 0.04);
    const moveX = (pdx / pdist) * pursuitSpeed;
    const moveY = (pdy / pdist) * pursuitSpeed;

    set(state => ({
        pursuer: {
            ...state.pursuer,
            active: true,
            speed: pursuitSpeed,
            x: state.pursuer.x + moveX,
            y: state.pursuer.y + moveY
        }
    }));
  },

  setShipCoords: (x, y) => set(state => ({ ship: { ...state.ship, x, y } })),
  
  escalatePursuit: (amount) => set((state) => ({
    stats: { ...state.stats, stigma: Math.min(100, state.stats.stigma + amount) }
  })),

  damageComponent: (id, amount) => set((state) => ({
    ship: {
        ...state.ship,
        components: state.ship.components.map(c => 
            c.id === id ? { ...c, health: Math.max(0, c.health - amount) } : c
        )
    }
  })),

  repairShipComponent: (id, amount) => set((state) => ({
    ship: {
        ...state.ship,
        hull: Math.min(state.ship.maxHull, state.ship.hull + (amount / 2)),
        components: state.ship.components.map(c => 
            c.id === id ? { ...c, health: Math.min(c.maxHealth, c.health + amount) } : c
        )
    }
  })),

  gainWealth: (amount) => set(state => ({
    stats: { ...state.stats, wealth: state.stats.wealth + amount }
  })),

  gainKnowledge: (amount) => set(state => ({
    stats: { ...state.stats, knowledge: state.stats.knowledge + amount }
  })),

  addReagent: (id, quantity, potency) => set(state => {
    const existing = state.stats.reagents.find(r => r.id === id);
    if (existing) {
        return {
            stats: {
                ...state.stats,
                reagents: state.stats.reagents.map(r => r.id === id ? { ...r, quantity: r.quantity + quantity, potency: potency || r.potency } : r)
            }
        };
    } else {
        const template = state.manifest.reagents.find(r => r.id === id);
        return {
            stats: {
                ...state.stats,
                reagents: [...state.stats.reagents, { 
                    id, 
                    quantity, 
                    name: template?.name || id, 
                    description: template?.description || "",
                    potency: potency || 50 
                }]
            }
        };
    }
  }),

  loadProjectManifest: async (slug: string) => {
    const manifest = await (window as any).almagest.readProjectManifest(slug);
    if (manifest) {
      set({ manifest, currentProjectSlug: slug });
      const corpus = await (window as any).almagest.listCorpus(slug);
      set({ corpus });
    }
  },

  loadCorpus: async () => {
    const slug = get().currentProjectSlug;
    if (slug) {
        const corpus = await (window as any).almagest.listCorpus(slug);
        set({ corpus });
    }
  },

  addEntitiesToManifest: (entities) => {
    set(state => {
        const newManifest = { ...state.manifest };
        if (entities.reagents) {
            newManifest.reagents = [...newManifest.reagents, ...entities.reagents.map(r => ({
                id: r.name.toLowerCase().replace(/\s+/g, '_'),
                name: r.name,
                description: r.description,
                properties: {
                    potency: 50,
                    instability: 20
                },
                variant_options: []
            }))];
        }
        if (entities.locations) {
            newManifest.locations = [...newManifest.locations, ...entities.locations.map(l => ({
                id: l.name.toLowerCase().replace(/\s+/g, '_'),
                name: l.name,
                description: l.description,
                type: 'port',
                unlocked: true,
                x: l.coordinates?.[0] || 50,
                y: l.coordinates?.[1] || 50,
                port_config: {
                    scarcity: 0.5,
                    reagents_for_sale: [],
                    reagents_needed: []
                }
            }))];
        }
        if (entities.encounters) {
             newManifest.encounters = [...newManifest.encounters, ...entities.encounters.map(e => ({
                id: e.title.toLowerCase().replace(/\s+/g, '_'),
                title: e.title,
                description: e.description,
                location: 'scanderoon',
                date: '1628-06-01',
                type: 'discovery',
                stakes: { honor: 5, wealth: 0, knowledge: 10 },
                choices: [{ text: "Proceed", consequence: "The encounter concludes." }]
             }))];
        }
        return { manifest: newManifest };
    });
  },

  saveManifest: async () => {
    const slug = get().currentProjectSlug;
    const manifest = get().manifest;
    if (slug) {
        await (window as any).almagest.saveAsset('manifest', { 
            project: slug, 
            manifest 
        });
    }
  }
}));
