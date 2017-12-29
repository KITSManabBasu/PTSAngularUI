import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingextractComponent } from './billingextract.component';

describe('BillingextractComponent', () => {
  let component: BillingextractComponent;
  let fixture: ComponentFixture<BillingextractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingextractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingextractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
