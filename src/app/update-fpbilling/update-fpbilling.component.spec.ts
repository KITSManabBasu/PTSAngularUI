import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFpbillingComponent } from './update-fpbilling.component';

describe('UpdateFpbillingComponent', () => {
  let component: UpdateFpbillingComponent;
  let fixture: ComponentFixture<UpdateFpbillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFpbillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFpbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
