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
    };
    pursuer: PursuerState;
    tick: () => void;
    escalatePursuit: (stigma: number, day: number) => void;
    repairShipComponent: (id: string, amount: number) => void;
    damageComponent: (id: string, amount: number) => void;
    movePursuer: (targetX: number, targetY: number) => void;
}

export const useEngineStore = create<EngineState>((set, get) => ({
    ship: {
        hull: 100,
        maxHull: 100,
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
        speed: 0.5
    },
    tick: () => set((state) => {
        if (!state.pursuer.active) return state;

        // Pursuer pathfinding (Move towards target or center)
        const dx = state.pursuer.x > 50 ? -state.pursuer.speed : state.pursuer.speed;
        const dy = state.pursuer.y > 50 ? -state.pursuer.speed : state.pursuer.speed;
        
        return {
            pursuer: {
                ...state.pursuer,
                x: state.pursuer.x + dx,
                y: state.pursuer.y + dy
            }
        };
    }),
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
