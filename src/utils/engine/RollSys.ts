/**
 * ROLL ENGINE (v1.0)
 * All game chance and combat modifiers must pass through this funnel.
 */

export interface RollResult {
    roll: number;
    bonus: number;
    total: number;
    success: boolean;
}

export const RollSys = {
    /** 
     * Perform a standard d100 check vs a target. 
     */
    check: (threshold: number, bonus = 0): RollResult => {
        const roll = Math.floor(Math.random() * 100) + 1;
        const total = roll + bonus;
        return {
            roll,
            bonus,
            total,
            success: total >= threshold
        };
    },

    /**
     * Calculate combat variance.
     */
    variant: (base: number, deviation: number): number => {
        const factor = (Math.random() * 2) - 1; // -1 to 1
        return Math.floor(base + (factor * deviation));
    },

    /**
     * Historical Sighting Check (Logarithmic decay based on day)
     */
    shouldEncounterSighting: (stigma: number, day: number): boolean => {
        const baseChance = 5; // 5% base
        const modifier = (stigma / 10) + (day / 5);
        return Math.random() * 100 < (baseChance + modifier);
    },

    /**
     * HEADLESS SIMULATION: Run N checks to verify distribution.
     */
    stressTest: (iterations = 1000, threshold = 50) => {
        let successCount = 0;
        const results = [];
        for (let i = 0; i < iterations; i++) {
            const res = RollSys.check(threshold);
            if (res.success) successCount++;
            if (i < 10) results.push(res); // sample first 10
        }
        return {
            total: iterations,
            successes: successCount,
            rate: (successCount / iterations) * 100,
            samples: results
        };
    }
};

/**
 * DEFINITION OF DONE (Verification Code)
 * Logic for checking if a system meets 'Almagest Standards'.
 */
export const verifySystemIntegrity = (systemId: string, data: any) => {
    const rules = {
        'combat': ['hp', 'log', 'turns'],
        'ship': ['hull', 'components', 'weapons'],
        'narrative': ['choices', 'stakes', 'description']
    };

    const requirements = rules[systemId as keyof typeof rules] || [];
    const missing = requirements.filter(req => !(req in data));
    
    return {
        valid: missing.length === 0,
        missing,
        timestamp: Date.now()
    };
};
