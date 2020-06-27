/*
    Describes a playable character Race in UESTRPG.
*/
export class characterRace {
    id: number;
    name: string;
    // Strength, Agility, Endurance, Intelligence, Willpower, Personality in that order.
    abilitymodifiers: number[];
    size: string;
    // Feet per turn, base walking.
    speed: number;
    // Not connected to Feature system.
    features: string[];
    // Number of skill proficiencies to choose from following list.
    numberskills: number;
    skillproficiences: string[];
    // Number of tool proficiencies to choose from following list.
    numbertools: number;
    toolselections: string[];
    // Number of languages to choose from following list.
    numberlanguages: number;
    languageselections: string[];
    // Languages and Proficiencies that do not need to be chosen.
    toolsandlanguages: string[];
    // Luck points from race
    luck: number;
    // Saving throws if applicable.
    savingThrows: string[];
}
