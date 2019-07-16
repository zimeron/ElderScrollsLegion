import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DiceRollerService } from '../../dice-roller.service';
import { CHARACTERCLASSES } from '../../character-classes/mock-classes';
import { characterClass } from '../../character-classes/character-class';
import { playerCharacter } from '../character';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-character-generator',
  templateUrl: './character-generator.component.html',
  styleUrls: ['./character-generator.component.css']
})
/*
  Generates a new player character with randomly generated stats, race, class, birthsign, and background
  based on current UESTRPG rules.

  No method yet for saving characters or session handling, so this is just a display for the time being.
*/
export class CharacterGeneratorComponent implements OnInit {

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
    features: []
  };

  // Flags for template
  attributesCalced = false;
  classCalced = false;

  constructor(private dice: DiceRollerService) { }

  // Rolls attributes by summing 4d6 drop lowest for each attribute. And updates properties for binding.
  rollAttributes(): void {
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
    // Tell template to display
    this.attributesCalced = true;
  }

  // Pulls a class randomly from the database (currently mocks) and relevant data and bindings
  rollClass(): void {
    // Pulls random class
    let classIndex;
    this.dice.rollArb(CHARACTERCLASSES.length)
      .subscribe(classRoll => classIndex = classRoll - 1);
    const charClass = CHARACTERCLASSES[classIndex];
    this.randomCharacter.name = charClass.name;
    // Pull in default inventory
    this.randomCharacter.inventory = charClass.inventory;
    // Make inventory Selections
    this.selectInventory(charClass.inventoryselections);
    // Select Skill Proficiencies
    this.selectSkills(charClass.numberskills, charClass.skillproficienies);
    // Pull in features
    this.randomCharacter.features = charClass.features;
    // Pull in other proficiencies
    this.randomCharacter.toolsandlanguages = charClass.toolsandlanguages;
    // Modify attributes
    this.modifyAttributes(charClass.abilitymodifiers);
    // Select sub class if applicable
    this.selectSubClass(charClass.subclasses);
  }

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

  // Randomly selects skill proficiencies from possibilities (skillproficiencies), based on how many are available (numberskills)
  private selectSkills(numberskills: number, skillproficiencies: string[]): void {
    let j; // Iterator for numberskills
    let skillRolls: number[] = []; // Rolls for skills to check they aren't the same.
    for (j = 0; j < numberskills;) {
      this.dice.rollArb(skillproficiencies.length)
        .subscribe(skillRoll => {
          // Make sure the skill being selected hasn't already been selected. If it has roll again.
          if (skillRolls.findIndex(k => k == skillRoll) == -1) {
            skillRolls.push(skillRoll);
            this.randomCharacter.skillproficiencies[j] = skillproficiencies[skillRoll - 1];
            j++;
          }
        });
    }
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

  ngOnInit() {
    this.rollAttributes();
    this.rollClass();
  }

}
