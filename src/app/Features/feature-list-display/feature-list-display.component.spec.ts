import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureListDisplayComponent } from './feature-list-display.component';

describe('FeatureListDisplayComponent', () => {
  let component: FeatureListDisplayComponent;
  let fixture: ComponentFixture<FeatureListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
