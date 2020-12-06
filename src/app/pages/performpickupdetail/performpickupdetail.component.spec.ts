import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformpickupdetailComponent } from './performpickupdetail.component';

describe('PerformpickupdetailComponent', () => {
  let component: PerformpickupdetailComponent;
  let fixture: ComponentFixture<PerformpickupdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformpickupdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformpickupdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
