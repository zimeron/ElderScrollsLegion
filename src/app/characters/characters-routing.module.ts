import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterGeneratorComponent } from './character-generator/character-generator.component';

// Handles routing for character module.
const routes: Routes = [
  { path: 'newRandChar', component: CharacterGeneratorComponent }
];


@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ]
})
export class CharactersRoutingModule { }
