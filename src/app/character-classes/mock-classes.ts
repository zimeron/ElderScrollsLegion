import {characterClass } from './character-class';

export const CHARACTERCLASSES: characterClass[] = [
    {
      id: 1,
      name: 'Barbarian',
      resources: [12, 0],
      savingthrows: ['Strength', 'Endurance'],
      inventoryselections: ['any polearm', 'any long blade', 'two handaxes', 'any short blade'],
      inventory: ['explorers pack', 'four javelins'],
      features: ['Rage', 'Unarmored Defense' ],
      numberskills: 2,
      skillproficienies: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'],
      toolsandlanguages: [
          'Light Armor',
          'Medium Armor',
          'Shields',
          'Axe',
          'Blunt',
          'Hand-to-Hand',
          'Long Blade',
          'Marksman',
          'Polearms',
          'Short Blade'
        ],
      abilitymodifiers: [0, 0, 0, 0, 0, 0],
      subclasses: []
    },
    {
      id: 2,
      name: 'Bard',
      resources: [8, 4],
      savingthrows: ['Agility', 'Personality'],
      inventoryselections: ['rapier', 'longsword', 'diplomat pack', 'entertainer pack', 'lute', 'non-lute musical instrument'],
      inventory: ['Leather Armor', 'dagger'],
      features: ['Spellcasting: Bard', 'Bardic Inspiration'],
      numberskills: 3,
      skillproficienies: [
        'Athletics',
        'Acrobatics',
        'Sleight of Hand',
        'Stealth',
        'Arcana',
        'History',
        'Investigation',
        'Nature',
        'Religion',
        'Animal Handling',
        'Insight',
        'Medicine',
        'Perception',
        'Survival',
        'Deception',
        'Intimidation',
        'Performance',
        'Persuasion'
      ],
      toolsandlanguages: [
        'Light Armor',
        'Long Blade',
        'Marksman',
        'Short Blade',
        'Three musical instruments'
      ],
      abilitymodifiers: [0, 0, 0, 0, 0, 0],
      subclasses: []
    }
];
