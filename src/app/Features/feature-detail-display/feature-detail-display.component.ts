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
export class FeatureDetailDisplayComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private featureService: FeatureService,
    private messageService: MessageService
  ) { }

  feature: Feature;

  ngOnInit() {
    this.getFeature();
  }

  getFeature(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.featureService.getFeatureById(id)
      .subscribe(feature => {
        this.feature = feature;
        console.log(this.feature);
        this.messageService.clear();
      });

  }

  goBack(): void {
    this.location.back();
  }

}
