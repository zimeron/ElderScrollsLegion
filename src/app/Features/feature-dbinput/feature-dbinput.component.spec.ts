import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDBInputComponent } from './feature-dbinput.component';

describe('FeatureDBInputComponent', () => {
  let component: FeatureDBInputComponent;
  let fixture: ComponentFixture<FeatureDBInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureDBInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDBInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
