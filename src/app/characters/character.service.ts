import { Injectable } from '@angular/core';
import { playerCharacter } from '../characters/character';
import { DiceRollerService } from '../dice-roller.service';
import { CHARACTERCLASSES } from '../character-classes/mock-classes';
import { CHARACTERRACES } from '../races/mock-races';
// import { BACKGROUNDS } from '../backgrounds/mock-backgrounds';
import { BackgroundsService } from '../backgrounds/backgrounds.service';
import { BIRTHSIGNS } from '../birthsigns/mock-birthsigns';

@Injectable({
  providedIn: 'root'
})

/*
  Handler for all Character related services, for now random generations based on hardcoded
  strings. Future will include database lookups to dynamically pull and randomize generation.
*/
export class CharacterService {

// Player character being generated
randomCharacter: playerCharacter = {
  name: '',
  strength: 0,
  agility: 0,
  endurance: 0,
  intelligence: 0,
  willpower: 0,
  personality: 0,
  resources: [],
  inventory: [],
  alignment: '',
  class: '',
  subclass: 'N/A',
  race: '',
  birthsign: '',
  background: '',
  skillproficiencies: [],
  toolsandlanguages: [],
  speed: 0,
  personalityTraits: [],
  size: '',
  features: [],
  septims: 0
};

  constructor(private dice: DiceRollerService, private backgroundService: BackgroundsService) { }

  // Rolls a new character based on random rolls of character properties (class, race, birthsign, background)
  rollCharacter(): playerCharacter {
    this.rollAttributes();
    this.rollClass();
    this.rollRace();
    this.rollBackground();
    this.rollBirthsign();
    return this.randomCharacter;
  }

  // Rolls attributes by summing 4d6 drop lowest for each attribute. And updates properties for binding.
  private rollAttributes(): void {
    let i; // Current attribute.
    let j; // Current die roll.
    const rolls: number[] = [0, 0, 0, 0]; // Stored die rolls.
    const attributes: number[] = [0, 0, 0, 0, 0, 0]; // Storage space for attribute scores

    for (i = 0; i < 6; i++) {
    // Roll 4d6
    for (j = 0; j < 4; j++) {
      this.dice.rollSix()
        .subscribe(roll => rolls[j] = roll);
    }
    // Sort Rolls, drop lowest (i.e. first)
    rolls.sort((a, b) => a - b);
    rolls[0] = 0;
    // Sum up remaining rolls, store
    attributes[i] = rolls.reduce((a, b) => a + b, 0);
  }

    // Update attributes
    this.randomCharacter.strength = attributes[0];
    this.randomCharacter.agility = attributes[1];
    this.randomCharacter.endurance = attributes[2];
    this.randomCharacter.intelligence = attributes[3];
    this.randomCharacter.willpower = attributes[4];
    this.randomCharacter.personality = attributes[5];

  }

  // Pulls a class randomly from the database (currently mocks) and relevant data and bindings
  private rollClass(): void {
    // Pulls random class
    let charClass;
    this.dice.rollArb(CHARACTERCLASSES.length)
      .subscribe(classRoll => {
        const classIndex = classRoll - 1;
        charClass = CHARACTERCLASSES[classIndex];
      });

    this.randomCharacter.class = charClass.name;

    // Pull in default inventory
    this.randomCharacter.inventory = charClass.inventory;

    // Make inventory Selections
    this.selectInventory(charClass.inventoryselections);

    // Select Skill Proficiencies
    this.randomCharacter.skillproficiencies = this.selectProfs(charClass.numberskills, charClass.skillproficienies);

    // Pull in features
    this.randomCharacter.features = charClass.features;

    // Pull in other proficiencies
    this.randomCharacter.toolsandlanguages = charClass.toolsandlanguages;

    // Modify attributes
    this.modifyAttributes(charClass.abilitymodifiers);

    // Select sub class if applicable
    this.selectSubClass(charClass.subclasses);
  }

  // Selects race from database (currently mocks) at random, and fills in necessary data.
  private rollRace() {
    // Pulls random race
    let charRace;
    this.dice.rollArb(CHARACTERRACES.length)
      .subscribe(raceRoll => {
        const raceIndex = raceRoll - 1;
        charRace = CHARACTERRACES[raceIndex];
      });


    // Set race name
    this.randomCharacter.race = charRace.name;

    // Make any ability modifications
    this.modifyAttributes(charRace.abilitymodifiers);

    // Set Size
    this.randomCharacter.size = charRace.size;

    // Set walking speed in feet
    this.randomCharacter.speed = charRace.speed;

    // Add race features to current Feature list.
    let i;
    for (i = 0; i < charRace.features.length; i++) {
      this.randomCharacter.features.push(charRace.features[i]);
    }

    // Select skill proficiencies from possibilities if applicable
    const skillProfs = this.selectProfs(charRace.numberskills, charRace.skillproficiences);
    for (i = 0; i < skillProfs.length; i++) {
      this.randomCharacter.skillproficiencies.push(skillProfs[i]);
    }

    // Select Tool/Armor/Weapon proficiencies from possibilities if applicable
    const toolProfs = this.selectProfs(charRace.numbertools, charRace.toolselections);
    for (i = 0; i < toolProfs.length; i++) {
      this.randomCharacter.toolsandlanguages.push(toolProfs[i]);
    }

    // Select Languages from possibilities if applicable
    const languages = this.selectProfs(charRace.numberlanguages, charRace.languageselections);
    for(i = 0; i < languages.length; i++) {
      this.randomCharacter.toolsandlanguages.push(languages[i]);
    }

    // Add default languages, tools, weapons, and armor that do not need selecting.
    for (i = 0; i < charRace.toolsandlanguages.length; i++) {
      this.randomCharacter.toolsandlanguages.push(charRace.toolsandlanguages[i]);
    }
  }

  // Randomly selects a background from the database and sets data.
  private rollBackground() {
    // Pulls random background
    let charBackground;
    this.backgroundService.getRandomBackground()
      .subscribe(randomBackground => {
        charBackground = randomBackground;
      });

    // Set background name
    this.randomCharacter.background = charBackground.name;

    // Append background features
    let i;
    for ( i = 0; i < charBackground.features; i++) {
      this.randomCharacter.features.push(charBackground.features[i]);
    }

    // Append background inventory
    for (i = 0; i < charBackground.inventory; i++){
      this.randomCharacter.inventory.push(charBackground.inventory[i]);
    }

    // Set starting gold
    this.randomCharacter.septims = charBackground.septims;

    // Set default skill proficiencies
    for ( i = 0; i < charBackground.skillproficiencies; i++) {
      this.randomCharacter.skillproficiencies.push(charBackground.features[i]);
    }

    // Selects skill proficiency choices if applicable
    this.selectProfs(charBackground.numberskills, charBackground.skillselections);

    // Selects tool proficiencies if applicable
    this.selectProfs(charBackground.numbertools, charBackground.toolselections);

    // Selects languages if applicable
    this.selectProfs(charBackground.numberlanguages, charBackground.languageselections);

    // Pulls in default languages and tool proficiencies
    for ( i = 0; i < charBackground.toolsandlanguages.length; i++) {
      this.randomCharacter.toolsandlanguages.push(charBackground.toolsandlanguages[i]);
    }

    // Randomly selects a personality trait from available list
    this.selectPersonality(charBackground.personalities);

    // Randomly selects an ideal from available list
    this.selectPersonality(charBackground.ideals);

    // Randomly selects a bond from available list
    this.selectPersonality(charBackground.bonds);

    // Randomly selects a flaw from the available list
    this.selectPersonality(charBackground.flaws);

  }

  // Rolls a random birthsign and updates data
  private rollBirthsign() {
    // Pulls a random birthisgn
    let charBirsthign;
    this.dice.rollArb(BIRTHSIGNS.length)
      .subscribe(roll => {
        const birthisgnIndex = roll - 1;
        charBirsthign = BIRTHSIGNS[birthisgnIndex]
      });

    // Sets birthsign name
    this.randomCharacter.birthsign = charBirsthign.name;

    // Appends birthsign features
    let i;
    for (i = 0; i < charBirsthign.features.length; i++) {
      this.randomCharacter.features.push(charBirsthign.features[i]);
    }

    // Modify Attributes
    this.modifyAttributes(charBirsthign.abilitymodifiers);
  }

  // ****** Helper functions for rolling methods ****** //

  // Decides randomly between pairs of possible inventory items
  private selectInventory(inventoryselections: string[]): void {
    let i; // Element in inventoryselections
    let coinFlipResult;

    for (i = 0; i < inventoryselections.length; i += 2) {
      this.dice.coinFlip()
        .subscribe(coinFlip => {
          coinFlipResult = coinFlip;
          // Choose either first element in the pair, or the next. Iterate by 2 to skip to next pair.
          if (coinFlipResult === 1) {
            this.randomCharacter.inventory.push(inventoryselections[i]);
          } else {
            this.randomCharacter.inventory.push(inventoryselections[i + 1]);
          }
        });
    }
  }

  // Randomly selects proficiencies from possibilities (proficiencies), based on how many are available (numberprofs)
  private selectProfs(numberprofs: number, proficiencies: string[]): string[] {

    let j; // Iterator for numberprofs
    let rolls: number[] = []; // Rolls for proficiencies to check they aren't the same.
    let returnProfs: string[] = []; // Array to return.

    for (j = 0; j < numberprofs;) {
      this.dice.rollArb(proficiencies.length)
        .subscribe(roll => {
          // Make sure the proficiency being selected hasn't already been selected. If it has roll again.
          if (rolls.findIndex(k => k === roll) === -1) {
            rolls.push(roll);
            returnProfs[j] = proficiencies[roll - 1];
            j++;
          }
        });
    }
    return returnProfs;
  }

  // Modifies attributes given an ordered ability modifier array.
  private modifyAttributes(abilitymodifiers: number[]) {
    this.randomCharacter.strength += abilitymodifiers[0];
    this.randomCharacter.agility += abilitymodifiers[1];
    this.randomCharacter.endurance += abilitymodifiers[2];
    this.randomCharacter.intelligence += abilitymodifiers[3];
    this.randomCharacter.willpower += abilitymodifiers[4];
    this.randomCharacter.personality += abilitymodifiers[5];
  }

  // Selects subclass from possibilities if applicable.
  private selectSubClass(subclasses: string[]) {
    if (subclasses.length > 0) {
      this.dice.rollArb(subclasses.length)
      .subscribe(roll => this.randomCharacter.subclass = subclasses[roll - 1]);
    }
  }

  // Selects personality traits from possibilities for backgrounds
  private selectPersonality(personalityTraits: string[]) {
    this.dice.rollArb(personalityTraits.length)
    .subscribe(roll => this.randomCharacter.personalityTraits.push(personalityTraits[roll - 1]));
  }

}
