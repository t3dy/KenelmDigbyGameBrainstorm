import json
import os

REAGENTS_DATA = [
    {
        "id": "powder_of_sympathy",
        "name": "Powder of Sympathy",
        "description": "A healing agent applied to bloodied bandages to cure wounds remotely.",
        "properties": { "potency": 85, "instability": 40, "element": "aether" },
        "historical_context": "Digby's most famous discovery—a bridge between experimental curiosity and magical thinking."
    },
    {
        "id": "vitriol_of_copper",
        "name": "Vitriol of Copper",
        "description": "A deep blue substance used in the purification of symbols and metals.",
        "properties": { "potency": 60, "instability": 20, "element": "water" },
        "historical_context": "A central reagent in his collections of chymical secrets compiled by George Hartmann."
    },
    {
        "id": "lead_transmutation",
        "name": "Lead of Transition",
        "description": "Heavy matter awaiting the spark of rarity.",
        "properties": { "potency": 30, "instability": 10, "element": "earth" },
        "historical_context": "The base metal for his efforts in maturation and perfection."
    },
    {
        "id": "hidden_food_of_life",
        "name": "Hidden Food of Life",
        "description": "A subtle substance in the air that nourishes the vital force.",
        "properties": { "potency": 95, "instability": 5, "element": "air" },
        "historical_context": "Anticipates the concept of oxygen but framed within vitalist philosophy."
    },
    {
        "id": "alkahest",
        "name": "Alkahest",
        "description": "The universal solvent, distilled through the comparison of countless variants.",
        "properties": { "potency": 100, "instability": 90, "element": "aether" },
        "historical_context": "The central goal of the Paris Circle, requiring rigorous Philological work."
    }
]

MANUSCRIPTS_DATA = [
    {
        "id": "ms_alkahest",
        "title": "On the True Nature of the Alkahest",
        "author": "The Paris Alchemical Circle",
        "variants": [
            "Variant A (Hartmann): 'The solvent arises from the spirit of Vitriol, distilled seven times over the ashes of an Oak.'",
            "Variant B (Duclos): 'Nay, the spirit must be drawn from the Hidden Food of the Air, using a magnet of refined Iron.'",
            "Variant C (Loberie): 'Both are partial; the true fire is found in the union of Vitriol and the Hidden Food, at the hour of the Lunar Apex.'"
        ],
        "true_result": "alkahest"
    }
]

ENCOUNTERS_DATA = [
    {
        "id": "scanderoon_battle",
        "title": "The Battle of Scanderoon",
        "location": "Alexandretta (Scanderoon)",
        "date": "1628-06-16",
        "description": "A naval engagement against Venetian and French ships in the Mediterranean.",
        "type": "naval",
        "stakes": { "honor": 50, "wealth": 80, "knowledge": 10 },
        "choices": [
            { "text": "Aggressive pursuit with the 'Eagle'", "consequence": "Gain immense wealth but risk honor with the Crown." },
            { "text": "Negotiated seizure", "consequence": "A more surgical victory, gaining prestige among merchants." }
        ]
    },
    {
        "id": "gresham_college_withdrawal",
        "title": "The Mourning Hermit",
        "location": "Gresham College, London",
        "date": "1633-05-01",
        "description": "After Venetia's death, you retreat to a laboratory to master the secrets of matter.",
        "type": "alchemy",
        "stakes": { "honor": -10, "wealth": -20, "knowledge": 100 },
        "choices": [
            { "text": "Master the 'Powder of Sympathy'", "consequence": "Knowledge increases but your reputation for credulity grows." },
            { "text": "Study the 'Nature of Bodies'", "consequence": "Deep philosophical insight into atomic composites." }
        ]
    }
]

def save_data():
    base_path = "src/data/"
    if not os.path.exists(base_path): os.makedirs(base_path)
    with open(f"{base_path}reagents.json", "w") as f: json.dump(REAGENTS_DATA, f, indent=2)
    with open(f"{base_path}encounters.json", "w") as f: json.dump(ENCOUNTERS_DATA, f, indent=2)
    with open(f"{base_path}manuscripts.json", "w") as f: json.dump(MANUSCRIPTS_DATA, f, indent=2)
    print("Almagest Ingestion Complete: Manuscripts included.")

if __name__ == "__main__":
    save_data()
