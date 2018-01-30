import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkillModalComponent } from './admin-skill-modal.component';

describe('AdminSkillModalComponent', () => {
  let component: AdminSkillModalComponent;
  let fixture: ComponentFixture<AdminSkillModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSkillModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSkillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
