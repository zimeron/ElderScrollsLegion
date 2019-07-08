import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CharacterClassDBInputComponent } from './character-class-dbinput/character-class-dbinput.component';

const routes: Routes = [
  { path: 'newClass', component: CharacterClassDBInputComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CharacterClassRoutingModule { }
