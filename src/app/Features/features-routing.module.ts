import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureDBInputComponent } from './feature-dbinput/feature-dbinput.component';
import { FeatureService } from './feature-service.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'newFeature', component: FeatureDBInputComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
