import { Component, Input } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentDetailService } from '../../../../../features/services/talent-detail.service';
import { CustomValidators } from '../../Validations/CustomValidators';

@Component({
  selector: 'app-socials-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Agrega los medios sociales"
    description="Agrega y muestra los medios sociales"
  >
    <form [formGroup]="socialForm" (ngSubmit)="update()">
      <div class="grid gap-4 mb-8">
        <app-text-input
          [id]="'link-linkedin'"
          [value]="linkedinLink"
          formControlName="linkedinLink"
          label="Link de Linkedin"
          placeholder="Link del perfil de LinkedIn"
        >
        </app-text-input>
        <app-text-input
          [id]="'link-github'"
          [value]="githubLink"
          formControlName="githubLink"
          label="Link de GitHub"
          placeholder="Link del perfil de GitHub"
        >
        </app-text-input>
      </div>
      <div class="grid gap-4 md:grid-cols-2 mb-1">
        <span
          class="font-medium text-red-500 leading-tight"
          *ngIf="
            socialForm.controls['linkedinLink'].invalid &&
            socialForm.controls['linkedinLink'].touched
          "
        >
          El campo de linkedin campo es obligatorio.
        </span>
        <span
          class="font-medium text-red-500 leading-tight"
          *ngIf="
            socialForm.controls['githubLink'].invalid &&
            socialForm.controls['githubLink'].touched
          "
        >
          El campo de github es obligatorio.
        </span>
      </div>
      <div
        class="grid gap-4 md:grid-cols-2 mb-1"
        *ngIf="
          (socialForm.get('githubLink')?.touched &&
            socialForm.get('githubLink')?.errors) ||
          (socialForm.get('linkedinLink')?.touched &&
            socialForm.get('linkedinLink')?.errors)
        "
      >
        <span
          class="font-medium text-orange-500 leading-tight"
          *ngIf="socialForm.get('linkedinLink')?.errors?.['linkedinUrl']"
        >
          El enlace que ingresaste no cumple con el formato de linkeind
        </span>
        <span
          class="font-medium text-orange-500 leading-tight"
          *ngIf="socialForm.get('githubLink')?.errors?.['githubUrl']"
        >
          El enlace que ingresaste no cumple con el formato de github
        </span>
      </div>
      <app-cancel-save-buttons
        [form]="socialForm"
        [modal_id]="modal_id"
        [save_button_id]="'btn-socials'"
        (cancelClicked)="socialForm.reset()"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class SocialsModalFormComponent {
  modal_id: string = 'socials-modal';
  @Input() id!: string;
  @Input() title!: string;
  githubLink!: string;
  linkedinLink!: string;

  socialForm!: FormGroup;

  constructor(
    private data: SharedDataService,
    private formBuilder: FormBuilder,
    private talentDetailService: TalentDetailService
  ) { }

  ngOnInit() {
    this.buildForm();

    this.data.currentGithubLink.subscribe((link) => {
      this.githubLink = link;
      this.socialForm.get('githubLink')?.setValue(this.githubLink);
    });
    this.data.currentLinkedinLink.subscribe((link) => {
      this.linkedinLink = link;
      this.socialForm.get('linkedinLink')?.setValue(this.linkedinLink);
    });
  }

  buildForm() {
    this.socialForm = this.formBuilder.group({
      githubLink: ['', [Validators.required, CustomValidators.githubUrl()]],
      linkedinLink: ['', [Validators.required, CustomValidators.linkedinUrl()]],
    });
  }

  update() {
    if (this.socialForm.valid) {
      let { githubLink, linkedinLink } = this.socialForm.value;

      this.talentDetailService.updateSocialsForCurrentTalent({
        githubLink,
        linkedinLink,
      });
      this.socialForm.reset();
    }
  }
}
