import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResourceallocationComponent } from './update-resourceallocation.component';

describe('UpdateResourceallocationComponent', () => {
  let component: UpdateResourceallocationComponent;
  let fixture: ComponentFixture<UpdateResourceallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResourceallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResourceallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
