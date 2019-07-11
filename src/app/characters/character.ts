/*
    Describes a player Character from UESTRPG, in simple terms. Not yet JOINed with any other data.
*/
export class character{
    name: string;
    stats: number[];
    resources: number[];
    inventory: string[];
    alignment: string;
    class: string;
    race: string;
    birthsign: string;
    background: string;
    skillproficiencies: string[];
    toolsandlanguages: string[];
    speed: number;
    personality: string[];
    size: string;
}
