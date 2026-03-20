# IMP-002: Tactical Escalation (Pursuit & Repair)

## 🎯 Intent
To implement the "Tactical Tension" loop where the Venetian Pursuer becomes more aggressive over time (linked to Stigma) and the player can deploy the "Weapon Salve" to remotely repair ship components.

## 🛠️ Files to Modify
- `src/state/engineStore.ts`: 
    - Update `tick()` logic to consume `stigma` and `currentDay`.
    - Add `repairShip` action (The remote-sympathy repair).
- `src/components/laboratory/WeaponSalve.tsx`: 
    - Add a "Ship Domain" repair mode to complement the "Character Domain."
- `src/components/interface/NavMap.tsx`: 
    - Connect the [H] Repair button to the new store actions.
- `src/components/laboratory/Laboratory.tsx`:
    - Integrate `WeaponSalve` into the Lab layout.

## 🛡️ Dependencies & Tethers
- **Retroist Approval**: Pursuer speed curves must feel "Ultima V" lethal.
- **Chronicler Approval**: Every remote repair must log a "Sympathetic Resonance" event.

## ✅ Success Criteria
- Pursuer speed increases with `currentDay`.
- Pursuer `active` status triggers when `Stigma > 30`.
- Weapon Salve successfully restores health to a selected Ship Component (e.g. Masts) using a reagent.
- Final verify: NavMap health bar updates after a remote repair action.

---
**Status**: APPROVED BY FOREMAN
**Action**: Worker agent to proceed with implementation.
