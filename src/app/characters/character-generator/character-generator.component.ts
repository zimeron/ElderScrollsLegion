import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DiceRollerService } from '../../dice-roller.service';
import { CHARACTERCLASSES } from '../../character-classes/mock-classes';
import { CHARACTERRACES } from '../../races/mock-races';
import { characterClass } from '../../character-classes/character-class';
import { playerCharacter } from '../character';
import { take } from 'rxjs/operators';
import { CharacterService } from '../character.service';
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
  charCalced = false;

  constructor(private dice: DiceRollerService, private charService: CharacterService) { }

  ngOnInit() {
    this.randomCharacter = this.charService.rollCharacter();
    this.charCalced = true;
  }

}
