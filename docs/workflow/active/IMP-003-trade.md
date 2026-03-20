# IMP-003: Alchemical Market (Levantine Trade)

## 🎯 Intent
To implement the trading system that allows the player to convert **Wealth** into **Reagents** (and vice versa) while docked at Mediterranean ports. This completes the "Economic/Logistics" loop of the simulation.

## 🛠️ Files to Modify
- `src/state/gameStore.ts`: 
    - Add `buyReagent` and `sellReagent` actions.
- `src/data/schema.ts`:
    - Add `market` to `View` type.
- `src/App.tsx`:
    - Add `Market` view to the routing logic.
- `src/components/interface/Market.tsx`: (NEW FILE)
    - High-fidelity trade interface with "Sultan's Bazaar" aesthetics.
- `src/components/interface/NavMap.tsx`:
    - Add "Enter Port Bazaar" button appearing on location hover/selection.

## 🛡️ Dependencies & Tethers
- **Librarian Approval**: Reagent prices must reflect 17th-century scarcity (e.g. Antimony is expensive).
- **Retroist Approval**: The UI must feel like a "Commodities Exchange" from Sid Meier's Pirates or Ultima.

## ✅ Success Criteria
- Player can open the Market view from Scanderoon.
- Buying Vitriol reduces Wealth and increases Reagent quantity.
- UI displays current wealth and reagent stock in a unified "Ship's Manifest" style.
- Zero-crash verification on view transitions.

---
**Status**: APPROVED BY FOREMAN
**Action**: Worker agent to proceed with implementation.
