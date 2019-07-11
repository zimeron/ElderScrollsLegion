import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Feature } from '../Feature';
import { FeatureService } from '../feature-service.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-feature-detail-display',
  templateUrl: './feature-detail-display.component.html',
  styleUrls: ['./feature-detail-display.component.css']
})

/*
Describes a detailed display for a chosen Feature, showing Name, Description, and
Origin (Race, Class, Birthsign, or Background).

Is instantiated by the router after selection from the list in FeatureListDisplay.
*/

export class FeatureDetailDisplayComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private featureService: FeatureService,
    private messageService: MessageService
  ) { }

  feature: Feature;
  listControl = false;

  ngOnInit() {
    this.getFeature();
  }

  // Makes call to DB through FeatureService using ID contained in route,
  // which is passed through from selected Feature on the list.
  getFeature(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.featureService.getFeatureById(id)
      .subscribe(feature => {
        this.feature = feature;
        console.log(this.feature);
        this.messageService.clear();
        this.listControl = true;
      });

  }

  // Allows for going back to list using browser back button.
  goBack(): void {
    this.location.back();
  }

}
