import { characterRace } from './characterRace';

export const CHARACTERRACES: characterRace[] = [
    {
        id: 1,
        name: 'Altmer',
        abilitymodifiers: [0, 0, 0, 2, 1, 0],
        size: 'medium',
        speed: 30,
        features: ['Altmer Blood', 'Highborn', 'Studious Nature'],
        numberskills: 2,
        skillproficiences: ['Arcana', 'History', 'Nature', 'Religion'],
        numbertools: 1,
        toolselections: ['Alchemist Supplies', 'Calligrapher Supplies', 'Jeweler Tools'],
        numberlanguages: 2,
        languageselections: ['Bosmeri', 'Dunmeri', 'Jel', 'Orcish', 'Ta\'agra', 'Yoku'],
        toolsandlanguages: ['Tamrielic'],
        luck: 0,
        savingThrows: []
    },
    {
        id: 2,
        name: 'Argonian',
        abilitymodifiers: [0, 2, 0, 1, 0, 0],
        size: 'medium',
        speed: 30,
        features: ['Naturally Gifted Swimmer', 'Argonian Resilience', 'Bite', 'Histskin', 'Water-breathing', 'Protective Scales'],
        numberskills: 0,
        skillproficiences: [],
        numbertools: 0,
        toolselections: [],
        numberlanguages: 0,
        languageselections: [],
        toolsandlanguages: ['Alchemist Supplies', 'Short Blades', 'Spears', 'Tamrielic', 'Jel'],
        luck: 0,
        savingThrows: []
    }
];
