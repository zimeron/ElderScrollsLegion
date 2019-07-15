import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterGeneratorComponent } from './character-generator/character-generator.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterService } from './character.service';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    CharacterGeneratorComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MatCardModule
  ],
  providers: [
    CharacterService
  ]
})
export class CharactersModule { }
