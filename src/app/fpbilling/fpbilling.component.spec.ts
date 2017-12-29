import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpbillingComponent } from './fpbilling.component';

describe('FpbillingComponent', () => {
  let component: FpbillingComponent;
  let fixture: ComponentFixture<FpbillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpbillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
