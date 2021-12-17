import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventsAutoComponent } from './add-events-auto.component';

describe('AddEventsAutoComponent', () => {
  let component: AddEventsAutoComponent;
  let fixture: ComponentFixture<AddEventsAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventsAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventsAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
