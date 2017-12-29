import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillingdescriptionComponent } from './update-billingdescription.component';

describe('UpdateBillingdescriptionComponent', () => {
  let component: UpdateBillingdescriptionComponent;
  let fixture: ComponentFixture<UpdateBillingdescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBillingdescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBillingdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
