/*
    Describes a level 1 character class in UESTRPG.
*/
export class characterClass {
    id: number;
    name: string;
    // Health die sides, magicka at level 1 in that order.
    resources: number[];
    savingthrows: string[];
    // Holds pairs of items that must be selected between. Mutually exclusive items will be neighbors such that
    // index 0 and 1 are exclusive, 2 and 3 are exclusive, and so on.
    inventoryselections: string[];
    // Inventory items that don't need to be selected.
    inventory: string[];
    // Currently not hooked up to Feature system, describes only level 1 features.
    features: string[];
    // Specifies how many skills are to be chosen from the following list.
    numberskills: number;
    // List of possible skill proficiencies.
    skillproficienies: string[];
    toolsandlanguages: string[];
    // Strength, Agility, Endurance, Intelligence, Willpower, and Personality in that order.
    abilitymodifiers: number[];
    // Describes possible sublcasses up for choosing at level 1 if length = 0 there are no level 1 subclasses.
    subclasses: string[];
}
