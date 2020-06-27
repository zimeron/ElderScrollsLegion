import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { FeatureService } from '../feature-service.service';
import { Feature } from '../Feature';

/*
   Handles passing input from creating a new class/race Feature to the FeatureService
   for post to Ruby controller and eventually database input.
*/
@Component({
  selector: 'app-feature-dbinput',
  templateUrl: './feature-dbinput.component.html',
  styleUrls: ['./feature-dbinput.component.css']
})
export class FeatureDBInputComponent implements OnInit {
  constructor(private ngZone: NgZone, private featureService: FeatureService) { }
  // Form bindings for Feature input
  featureForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    origin: new FormControl('')
  });
  // Binding for textarea autosizing.
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  // Textarea resize logic
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  // On submit button, grabs form data and passes to Feature Service for post.
  postFeature() {
    const feature = new Feature();
    feature.name = this.featureForm.value.name;
    feature.description = this.featureForm.value.description;
    feature.origin = this.featureForm.value.origin;
    console.warn(this.featureForm.value);
    this.featureService.postFeature(feature)
      .subscribe(
        () => this.featureForm.reset()
      );
  }
  ngOnInit() {}
}
