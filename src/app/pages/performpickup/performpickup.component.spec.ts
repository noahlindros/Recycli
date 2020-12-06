import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformpickupComponent } from './performpickup.component';

describe('PerformpickupComponent', () => {
  let component: PerformpickupComponent;
  let fixture: ComponentFixture<PerformpickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformpickupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformpickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
