import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../../../services/shared-data-service.service';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { CustomValidators } from '../../Validations/CustomValidators';

@Component({
  selector: 'app-new-profile-pic-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Modifica la foto de perfil"
    description="Sube una nueva foto de perfil."
  >
    <form [formGroup]="imageForm" (ngSubmit)="update()">
      <app-file-input
        [id]="'new-profile-pic'"
        title="Sube una foto de perfil"
        description="PNG o JPG (Max. 1400x800 px)"
        [accept]="'image/png, image/jpeg, image/jpg'"
        formControlName="image"
      ></app-file-input>

      <div
        class="grid gap-2 mb-2"
        *ngIf="
          imageForm.get('image')?.touched ||
            imageForm.get('image')?.errors
        "
      >
        <span
          class="font-medium text-orange-500 leading-tight"
          *ngIf="imageForm.get('image')?.errors?.['required']"
        >
          No olvides que la imagen es requerida
        </span>
        <span
          class="font-medium text-orange-500 leading-tight"
          *ngIf="imageForm.get('image')?.errors?.['fileSize']"
        >
          El tamaño del archivo es demasiado grande
        </span>
      </div>
      <app-cancel-save-buttons
        [form]="imageForm"
        [modal_id]="modal_id"
        [save_button_id]="'save_'"
        (cancelClicked)="imageForm.reset()"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class NewProfilePicModalFormComponent {
  modal_id: string = 'new-profile-pic-modal';
  @Input() id!: string;
  @Input() title!: string;
  image!: string;

  imageForm!: FormGroup;

  constructor(private data: SharedDataService, private formBuilder: FormBuilder, private talentDetailService: TalentDetailService) { }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      image: ['', [CustomValidators.required, CustomValidators.fileSizeValidator(5 * 1024 * 1024)]]
    });
  }

  update() {
    if (this.imageForm.valid) {
      let { image } = this.imageForm.value;

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        console.log('base64data', base64data)
        this.talentDetailService.updateImageForCurrentTalent(base64data);
        this.imageForm.reset();
      };
    }
  }
}
