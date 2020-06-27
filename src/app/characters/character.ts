/*
    Describes a player Character from UESTRPG, in simple terms. Not yet JOINed with any other data.
*/
export class playerCharacter{
    name: string;
    strength: number;
    agility: number;
    endurance: number;
    intelligence: number;
    willpower: number;
    personality: number;
    resources: number[];
    inventory: string[];
    alignment: string;
    class: string;
    subclass: string;
    race: string;
    birthsign: string;
    background: string;
    skillproficiencies: string[];
    toolsandlanguages: string[];
    speed: number;
    size: string;
    features: string[];
    septims: number;
    luck: number;
    savingthrows: string[];
}
