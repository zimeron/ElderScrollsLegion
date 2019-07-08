import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { CharacterClassService } from '../character-class-service.service';
import { characterClass } from '../character-class';

@Component({
  selector: 'app-character-class-dbinput',
  templateUrl: './character-class-dbinput.component.html',
  styleUrls: ['./character-class-dbinput.component.css']
})
export class CharacterClassDBInputComponent implements OnInit {
// TODO: Figure out the best way to bind this data on the front, given the DB's expectations.
// TODO: Make button that allows for addition of new feature/new inv item etc. on click, to allow arbitrarily long form items.

// Form bindings for Class input
classForm = new FormGroup({
});
// Binding for textarea autosizing.
@ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
// Textarea resize logic
triggerResize() {
  // Wait for changes to be applied, then trigger textarea resize.
  this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
}
// On submit button, grabs form data and passes to Character Class Service for post.
postClass() {
  const charClass = new characterClass();
  charClass.name = this.classForm.value.name;
  console.warn(this.classForm.value);
  this.featureService
    .postClass(charClass)
    .subscribe();
}
  constructor(private ngZone: NgZone, private featureService: CharacterClassService) { }

  ngOnInit() {
  }

}
