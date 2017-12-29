import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWonComponent } from './update-won.component';

describe('UpdateWonComponent', () => {
  let component: UpdateWonComponent;
  let fixture: ComponentFixture<UpdateWonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
