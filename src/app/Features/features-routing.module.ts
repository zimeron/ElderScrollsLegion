import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureDBInputComponent } from './feature-dbinput/feature-dbinput.component';
import { Routes, RouterModule } from '@angular/router';
import { FeatureListDisplayComponent } from './feature-list-display/feature-list-display.component';
import { FeatureDetailDisplayComponent } from './feature-detail-display/feature-detail-display.component';

const routes: Routes = [
  { path: 'newFeature', component: FeatureDBInputComponent },
  { path: 'showAllFeatures', component: FeatureListDisplayComponent },
  { path: 'detail/:id' , component: FeatureDetailDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
