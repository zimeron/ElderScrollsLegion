import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureDBInputComponent } from './feature-dbinput/feature-dbinput.component';
import { FeatureService } from './feature-service.service';
import { FeaturesRoutingModule } from './features-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [
    FeatureService
  ],
  declarations:[
    FeatureDBInputComponent
  ],
  exports: [
    FeatureDBInputComponent
  ]
})
export class FeaturesModule { }
