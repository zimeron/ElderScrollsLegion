import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../feature-service.service';
import { Feature } from '../Feature';

@Component({
  selector: 'app-feature-list-display',
  templateUrl: './feature-list-display.component.html',
  styleUrls: ['./feature-list-display.component.css']
})

/* Handles display of all Features currently in database,
   through use of the GET feature of FeaturesService.
*/

export class FeatureListDisplayComponent implements OnInit {

features: Feature[];

constructor(private featureService: FeatureService) { }

ngOnInit() {
  // TODO: Format the JSON from this into Feature properly, it's currently formatted in terms of Rails DB handling
  // Calls FeatureService to get all features currently in database.
    this.featureService.getAllFeatures()
      .subscribe(features => this.features = features);
    console.log(this.features);
  }

}
