import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProjectFormComponent } from './client-project-form.component';

describe('ClientProjectFormComponent', () => {
  let component: ClientProjectFormComponent;
  let fixture: ComponentFixture<ClientProjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProjectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
