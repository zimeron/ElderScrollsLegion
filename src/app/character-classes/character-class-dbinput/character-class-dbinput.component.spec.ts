import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterClassDBInputComponent } from './character-class-dbinput.component';

describe('CharacterClassDBInputComponent', () => {
  let component: CharacterClassDBInputComponent;
  let fixture: ComponentFixture<CharacterClassDBInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterClassDBInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterClassDBInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
