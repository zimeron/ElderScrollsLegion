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
    race: '',
    birthsign: '',
    background: '',
    skillproficiencies: [],
    toolsandlanguages: [],
    speed: 0,
    personalityTraits: [],
    size: ''
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
    let charClass = CHARACTERCLASSES[classIndex];
    this.randomCharacter.name = charClass.name;
    let i; // Element in inventoryselections
    let coinFlipResult;
    // Decide randomly between pairs of possible inventory items
    for (i = 0; i < charClass.inventoryselections.length; i += 2) {
      this.dice.coinFlip()
        .subscribe(coinFlip => {
          coinFlipResult = coinFlip;
          if (coinFlipResult === 0) {
            this.randomCharacter.inventory.push(charClass.inventoryselections[i]);
          } else {
            this.randomCharacter.inventory.push(charClass.inventoryselections[i + 1]);
          }
        });
    }
    // Randomly selects skill proficiencies from the possiblities, based on how many are available to the class
    let j; // Iterator for numberskills
    for (j = 0; j < charClass.numberskills; j++) {
    }

  }


  ngOnInit() {
    this.rollAttributes();
    this.rollClass();
  }

}
