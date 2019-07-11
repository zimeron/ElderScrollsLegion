import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDetailDisplayComponent } from './feature-detail-display.component';

describe('FeatureDetailDisplayComponent', () => {
  let component: FeatureDetailDisplayComponent;
  let fixture: ComponentFixture<FeatureDetailDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureDetailDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
