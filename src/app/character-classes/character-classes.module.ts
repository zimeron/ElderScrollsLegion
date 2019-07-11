import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterClassService } from './character-class-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatCheckboxModule } from '@angular/material';
import { CharacterClassRoutingModule } from './character-class-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    CharacterClassRoutingModule
  ],
  providers: [
    CharacterClassService
  ],
  exports: [
  ]
})
export class CharacterClassesModule { }
