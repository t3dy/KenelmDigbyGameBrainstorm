# REPORT-002: Tactical Pursuit & Remote Repair

## 📊 Summary
Successfully executed **IMP-002**. The "Tactical Tension" loop is now active. The Venetian Pursuer scales with Stigma/Day, and the "Weapon Salve" allows for remote ship maintenance via the NavMap.

## 🛠️ Changes Made
- **engineStore.ts**: Added `escalatePursuit` (Day/Stigma scaling) and `repairShipComponent` (Remote repair logic).
- **WeaponSalve.tsx**: Upgraded to support "Naval Integrity" mode. Added a dynamic toggle between character and ship repair.
- **NavMap.tsx**: 
    - Implemented the `useEffect` pursuit tick (1s intervals).
    - Connected the **[H] Repair** button to a high-fidelity Modal rendering the `WeaponSalve`.
    - Linked `Stigma` levels to the "STIGMA STATUS" readout (STEALTH vs. SUSPECT).

## 🛑 Blockers & Issues Encountered
- **Scale desync**: Pursuer movement pixels needed calibration; settled on `0.5 + escalation` per tick for the prototype.
- **UI Overflow**: Managed the WeaponSalve modal sizing to fit the Ship-repair workbench without scroll-jank.

## ✅ Verification
- NavMap [H] button successfully opens the Weapon Salve in "Ship" mode.
- Activating Resonance in the modal successfully increases Ship Component health in the NavMap footer.
- Pursuer moves towards the player only when Stigma > 30 (SUSPECT status).

## 🔮 Next Action
Proceed with **IMP-003: Alchemical Market**, implementing the "Levantine Trade" UI and the "Ship's Manifest" logic for buying/selling reagents in port.
