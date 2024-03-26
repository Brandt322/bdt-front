import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { CustomValidators } from '../../Validations/CustomValidators';

@Component({
  selector: 'app-new-file-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Agregar un archivo"
    description="Sube un nuevo certificado, diploma o algún archivo que respalde tus aptitudes"
  >
    <form [formGroup]="fileForm" (ngSubmit)="onSubmit()">
      <app-file-input
        [id]="'new-file-pic'"
        title="Sube un archivo"
        description="PDF (Max. 5MB)"
        accept="application/pdf"
        formControlName="file"
        [modalClosed]="modalClosed"
      ></app-file-input>
      <div
        class="grid gap-2 mb-2"
        *ngIf="
          fileForm.get('file')?.touched ||
            fileForm.get('file')?.errors
        "
      >
        <span
          class="font-medium text-orange-500 leading-tight"
          *ngIf="fileForm.get('file')?.errors?.['required']"
        >
          No olvides que es necesario escoger un archivo para poder subirlo
        </span>
        <span
          class="font-medium text-orange-500 leading-tight"
          *ngIf="fileForm.get('file')?.errors?.['fileSize']"
        >
          El tamaño del archivo es demasiado grande
        </span>
      </div>

      <app-cancel-save-buttons
        [form]="fileForm"
        [modal_id]="modal_id"
        [save_button_id]="'save_new_file'"
        (cancelClicked)="cancelForm()"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class NewFileModalFormComponent implements OnInit {
  modal_id: string = 'new-file-modal-form';
  @Input() id!: string;
  @Input() title!: string;
  @Output() modalClosed = new EventEmitter<void>(); // Nuevo EventEmitter
  fileForm!: FormGroup;
  constructor(private fb: FormBuilder, private talentDetailService: TalentDetailService) { }

  ngOnInit(): void {
    this.formBuild();
  }

  cancelForm() {
    this.fileForm.reset();
    this.modalClosed.emit();
  }

  formBuild() {
    this.fileForm = this.fb.group({
      file: ['', [CustomValidators.required, CustomValidators.fileSizeValidator(5 * 1024 * 1024)]],
    });
  }

  onSubmit() {
    if (this.fileForm.valid) {
      const { file } = this.fileForm.value;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result as string;

        // Get the file name and type
        const fileName = file.name;
        const fileType = file.type.split('/')[1]; // This will get 'pdf' from 'application/pdf'

        // Create an object with the file data
        const fileData = {
          id: 0,
          file: base64File,
          fileName: fileName,
          fileType: fileType
        };
        // Now you can send the fileData object
        console.log(fileData);
        this.talentDetailService.addFileToCurrentTalent(fileData);
      };
      reader.readAsDataURL(file);
      this.fileForm.reset();
    }
  }


}
