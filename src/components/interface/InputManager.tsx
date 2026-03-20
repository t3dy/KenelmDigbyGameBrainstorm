import React, { useEffect } from 'react';
import { useGameStore } from '../../state/gameStore';

export const InputManager: React.FC = () => {
    const { 
        currentView, setView, currentEncounter, makeChoice, triggerScene 
    } = useGameStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            
            // Priority 1: Dialogue Choice [A, B, C...]
            if (currentEncounter && currentView !== 'staging') {
                if (key === 'a' || key === '1') { makeChoice(0); return; }
                if (key === 'b' || key === '2') { makeChoice(1); return; }
                if (key === 'c' || key === '3') { makeChoice(2); return; }
            }

            // Priority 2: Global Navigation [Ultima V Keys]
            switch (key) {
                case 'a': setView('nav'); break;
                case 'c': setView('lab'); break;
                case 'j': setView('journal'); break;
                case 'p': setView('philology'); break;
                case 'v': setView('log'); break;
                case 'e': setView('editor'); break;
                case 'g': setView('gallery'); break;
                case 's': triggerScene('intro_sympathy_secret'); break;
                case 'i': setView('intro'); break;
                case 'escape': setView('nav'); break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentView, currentEncounter, setView, makeChoice, triggerScene]);

    return null;
};
