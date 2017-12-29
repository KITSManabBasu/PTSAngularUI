import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceallocationComponent } from './resourceallocation.component';

describe('ResourceallocationComponent', () => {
  let component: ResourceallocationComponent;
  let fixture: ComponentFixture<ResourceallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
