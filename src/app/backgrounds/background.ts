export class Background {
    id: number;
    name: string;
    features: string[];
    inventory: string[];
    // Starting gold amount
    septims: number;
    skillproficiencies: string[];
    // Number of skill proficiencies to be selected from following list
    numberskills: number;
    skillselections: string[];
    // Number of tools to be selected from following list
    numbertools: number;
    toolselections: string[];
    // Number of languages to be selected from following list
    numberlanguages: number;
    languageselections: string[];
    // Tool/language proficiences that do not require selection.
    toolsandlanguages: string[];
    // Personality Traits
    personalities: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
}
