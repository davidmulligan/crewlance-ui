import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { BadRequestException } from 'shared/exception/bad-request-exception';
import { NotFoundException } from 'shared/exception/not-found-exception';
import { Skill } from 'shared/model/skill';
import { SkillService } from 'shared/service/skill.service';

@Component({
  selector: 'admin-skill-modal',
  templateUrl: './admin-skill-modal.component.html',
  styleUrls: ['./admin-skill-modal.component.css']
})
export class AdminSkillModalComponent implements OnDestroy {

  private skill: Skill = <Skill>{};
  private existingObject = false;
  private subscriptions: Subscription[] = [];

  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService, private skillService: SkillService) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  set skillId(skillId: number) {
    if (skillId) {
      this.subscriptions.push(this.skillService.get(skillId).subscribe(
        skill => {
          this.skill = skill;
        },
        (error: ApplicationException) => {
          if (error instanceof NotFoundException) {
            this.toastr.error('The skill was not found.', 'Error');
          } else {
            throw error;
          }
        }
      ));
    }
  }

  save(skill: Skill) {
    if (skill.id) {
      this.subscriptions.push(this.skillService.update(skill.id, skill).subscribe(
        response => {
          this.toastr.success('The skill was successfully saved.');
          this.activeModal.close(true);
        },
        (error: ApplicationException) => {
          if (error instanceof BadRequestException) {
            this.toastr.error('An unexpected error occured.', 'Error');
          } else {
            throw error;
          }
        }
      ));
    } else {
      this.subscriptions.push(this.skillService.create(skill).subscribe(
        response => {
          this.toastr.success('The skill was successfully saved.');
          this.activeModal.close(true);
        },
        (error: ApplicationException) => {
          if (error instanceof BadRequestException) {
            this.toastr.error('An unexpected error occured.', 'Error');
          } else {
            throw error;
          }
        }
      ));
    }
  }

  delete(skill: Skill) {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.subscriptions.push(this.skillService.delete(skill.id).subscribe(
      response => {
        this.toastr.success('The skill was successfully deleted.');
        this.activeModal.close(true);
      },
      (error: ApplicationException) => {
        if (error instanceof BadRequestException) {
          this.toastr.error('An unexpected error occured.', 'Error');
        } else {
          throw error;
        }
      }
    ));
  }

  private isExistingObject() {
    return this.skill.id !== undefined;
  }
}
