import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingdescriptionComponent } from './billingdescription.component';

describe('BillingdescriptionComponent', () => {
  let component: BillingdescriptionComponent;
  let fixture: ComponentFixture<BillingdescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingdescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
