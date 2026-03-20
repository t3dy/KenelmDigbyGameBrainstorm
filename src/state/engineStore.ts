import { create } from 'zustand';

interface ShipComponent {
    id: string;
    name: string;
    health: number;
    maxHealth: number;
    efficiency: number;
}

interface PursuerState {
    id: string;
    name: string;
    x: number;
    y: number;
    aggro: number; // Linked to Stigma
    active: boolean;
    speed: number; // Pixels per tick or step
}

interface EngineState {
    ship: {
        hull: number;
        maxHull: number;
        components: ShipComponent[];
        x: number;
        y: number;
    };
    pursuer: PursuerState;
    tick: () => void;
    setShipCoords: (x: number, y: number) => void;
    escalatePursuit: (stigma: number, day: number) => void;
    repairShipComponent: (id: string, amount: number) => void;
    damageComponent: (id: string, amount: number) => void;
    movePursuer: (targetX: number, targetY: number) => void;
}

export const useEngineStore = create<EngineState>((set, get) => ({
    ship: {
        hull: 100,
        maxHull: 100,
        x: 10,
        y: 15, // Starting Venice
        components: [
            { id: 'masts', name: 'Main Masts', health: 100, maxHealth: 100, efficiency: 1.0 },
            { id: 'athanor', name: 'Alchemical Athanor', health: 80, maxHealth: 100, efficiency: 1.0 },
            { id: 'galley', name: 'Crew Quarters', health: 100, maxHealth: 100, efficiency: 1.0 }
        ]
    },
    pursuer: {
        id: 'venetian_galley',
        name: 'The Serene Pursuer',
        x: 90,
        y: 10,
        aggro: 0,
        active: false,
        speed: 0.2
    },
    tick: () => {
        const state = get();
        if (!state.pursuer.active) return;

        const targetX = state.ship.x;
        const targetY = state.ship.y;
        
        // Pursuit Movement Logic (Vector toward target)
        const dx = targetX - state.pursuer.x;
        const dy = targetY - state.pursuer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 1) return; // Arrived or nearly there

        const moveX = (dx / dist) * state.pursuer.speed;
        const moveY = (dy / dist) * state.pursuer.speed;

        set(state => ({
            pursuer: {
                ...state.pursuer,
                x: state.pursuer.x + moveX,
                y: state.pursuer.y + moveY
            }
        }));
    },
    setShipCoords: (x, y) => set(state => ({ ship: { ...state.ship, x, y } })),
    escalatePursuit: (stigma, day) => set((state) => ({
        pursuer: {
            ...state.pursuer,
            aggro: stigma,
            active: stigma > 30 || day > 5,
            speed: 0.5 + (day * 0.1) + (stigma / 100)
        }
    })),
    repairShipComponent: (id, amount) => set((state) => ({
        ship: {
            ...state.ship,
            hull: Math.min(state.ship.maxHull, state.ship.hull + (amount / 2)), // Hull repair is bonus
            components: state.ship.components.map(c => 
                c.id === id ? { ...c, health: Math.min(c.maxHealth, c.health + amount) } : c
            )
        }
    })),
    damageComponent: (id, amount) => set((state) => ({
        ship: {
            ...state.ship,
            components: state.ship.components.map(c => 
                c.id === id ? { ...c, health: Math.max(0, c.health - amount) } : c
            )
        }
    })),
    movePursuer: (x, y) => set((state) => ({
        pursuer: { ...state.pursuer, x, y }
    }))
}));
