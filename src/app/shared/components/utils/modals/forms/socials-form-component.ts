import { Component, Input } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentDetailService } from '../../../../../features/services/talent-detail.service';

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
      <div class="grid gap-4 md:grid-cols-2">
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="
              socialForm.controls['linkedinLink'].invalid &&
              socialForm.controls['linkedinLink'].touched
            "
          >
            Este campo es obligatorio.
          </span>
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="
              socialForm.controls['githubLink'].invalid &&
              socialForm.controls['githubLink'].touched
            "
          >
            Este campo es obligatorio.
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
      githubLink: ['', Validators.required],
      linkedinLink: ['', Validators.required],
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
