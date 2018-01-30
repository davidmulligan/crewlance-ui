import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminSkillModalComponent } from 'app/admin/component/admin-skill-modal/admin-skill-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { Skill } from 'shared/model/skill';
import { SkillService } from 'shared/service/skill.service';

@Component({
  selector: 'admin-skill',
  templateUrl: './admin-skill.component.html',
  styleUrls: ['./admin-skill.component.css']
})
export class AdminSkillComponent implements OnInit, OnDestroy {

  private skills: Skill[];
  private filteredSkills: Skill[];
  private subscriptions: Subscription[] = [];

  constructor(private modalService: NgbModal, private skillService: SkillService) { }

  ngOnInit() {
    this.fetchSkills();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filter(query: string) {
    if (query) {
      this.filteredSkills = this.skills.filter(skill => skill.name.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.filteredSkills = this.skills;
    }
  }

  openModal(skillId: number) {
    const modalRef = this.modalService.open(AdminSkillModalComponent, { size: 'lg' });
    (<AdminSkillModalComponent> modalRef.componentInstance).skillId = skillId;
    modalRef.result.then((result) => {
      if (result) {
        this.fetchSkills();
      }
    });
  }

  private fetchSkills() {
    this.subscriptions.push(this.skillService.getAll().subscribe(
      skills => {
        this.filteredSkills = this.skills = skills;
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }
}
