import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerProjectComponent } from './freelancer-project.component';

describe('FreelancerProjectComponent', () => {
  let component: FreelancerProjectComponent;
  let fixture: ComponentFixture<FreelancerProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancerProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
