import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureDBInputComponent } from './feature-dbinput/feature-dbinput.component';
import { FeatureService } from './feature-service.service';
import { FeaturesRoutingModule } from './features-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatListModule, MatButtonModule } from '@angular/material';
import { FeatureListDisplayComponent } from './feature-list-display/feature-list-display.component';
import { FeatureDetailDisplayComponent } from './feature-detail-display/feature-detail-display.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [
    FeatureService
  ],
  declarations:[
    FeatureDBInputComponent,
    FeatureListDisplayComponent,
    FeatureDetailDisplayComponent
  ],
  exports: [
    FeatureDBInputComponent
  ]
})
export class FeaturesModule { }
