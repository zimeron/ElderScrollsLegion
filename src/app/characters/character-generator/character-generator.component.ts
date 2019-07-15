import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DiceRollerService } from '../../dice-roller.service';
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

  // Strength, Agility, Endurance, Intelligence, Willpower, Personality scores.
  strength: number;
  agility: number;
  endurance: number;
  intelligence: number;
  willpower: number;
  personality: number;

  // Flags for template
  attributesCalced = false;

  constructor(private dice: DiceRollerService) { }

  // Rolls attributes by summing 4d6 drop lowest for each attribute.
  rollAttributes(): void {
    let i; // Current attribute.
    let j; // Current die roll.
    const rolls: number[] = [0, 0, 0, 0]; // Stored die rolls.
    const attributes: number[] = [0, 0, 0, 0, 0, 0]; // Storage space for attribute scores
    for (i = 0; i < 6; i++) {
      for (j = 0; j < 4; j++) {
        const roll = this.dice.rollSix();
        rolls[j] = roll;
      }
      rolls.sort((a, b) => a - b);
      rolls[0] = 0;
      attributes[i] = rolls.reduce((a, b) => a + b, 0);
    }
    this.strength = attributes[0];
    this.agility = attributes[1];
    this.endurance = attributes[2];
    this.intelligence = attributes[3];
    this.willpower = attributes[4];
    this.personality = attributes[5];
    this.attributesCalced = true;
  }


  ngOnInit() {
    this.rollAttributes();
  }

}
