import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterGeneratorComponent } from './character-generator/character-generator.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterService } from './character.service';

@NgModule({
  declarations: [
    CharacterGeneratorComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule
  ],
  providers: [
    CharacterService
  ]
})
export class CharactersModule { }
