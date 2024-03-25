import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { CustomValidators } from '../../Validations/CustomValidators';
import { ICarouselItem } from '../../carousel/ICarousel-metadata';
import { DomSanitizer } from '@angular/platform-browser';
import { CancelSaveButtonsComponent } from './cancel-save-buttons';

@Component({
  selector: 'app-update-cv-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Modifica el CV actual"
    description="Aqui puedes ver el CV del talento o tambien actualizarlo."
  >
    <div class="flex justify-end items-center w-full mb-2">
      <button
        class="flex items-center  hover:rounded-full hover:shadow-lg hover:bg-indigo-300 dark:text-slate-100 dark:bg-gray-600 dark:hover:bg-gray-700 p-2"
        type="button"
        (click)="handleAddFile()"
      >
        <span class="material-symbols-outlined"> edit </span>
      </button>
    </div>
    <div
      *ngIf="cvFile"
      class="flex flex-shrink-0 relative w-full border-2 border-gray-100 rounded-md"
    >
      <img
        src="../../../../../assets/app-pdf-editar-convertir-visualizar.webp"
        [alt]="cvFile.fileName"
        class="object-cover object-center w-full h-48"
      />
      <a
        class="absolute w-full h-full p-6"
        [href]="sanitizePdfUrl(cvFile.file)"
        target="_blank"
      >
      </a>
    </div>
    <h2
      class="lg:text-xl text-center my-2 leading-4 text-base lg:leading-5 text-slate-800"
    >
      {{ cvFile?.fileName }}
    </h2>
    <form
      [formGroup]="fileForm"
      (ngSubmit)="onSubmit()"
      class="flex flex-col gap-2"
      *ngIf="addFile"
    >
      <app-file-input
        *ngIf="addFile"
        [id]="'update-cv-pic'"
        title="Agrega un archivo"
        description="PDF (Max. 5MB)"
        accept="application/pdf"
        formControlName="file"
      ></app-file-input>
      <div
        class="grid gap-2 mb-2"
        *ngIf="fileForm.get('file')?.touched || fileForm.get('file')?.errors"
      >
        <span
          class="font-medium text-orange-500 leading-tight"
          *ngIf="fileForm.get('file')?.errors?.['required']"
        >
          Si deseas actualizar tu cv, selecciona un archivo.
        </span>
        <span
          class="font-medium text-orange-500 leading-tight"
          *ngIf="fileForm.get('file')?.errors?.['fileSize']"
        >
          El tamaño del archivo es demasiado grande
        </span>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <button
          (click)="$event.stopPropagation()"
          (click)="cancelForm()"
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-[#009788] hover:bg-[#0a655e]"
          [disabled]="fileForm.invalid"
          [ngClass]="{
            'focus:outline-none  focus:ring-4 focus:ring-[#51f7db] dark:bg-[#04c8b0] dark:hover:bg-[#0a655e] dark:focus:ring-[#0a655e]':
              fileForm.valid,
            'cursor-not-allowed ': fileForm.invalid
          }"
          [attr.data-modal-hide]="modal_id"
        >
          Guardar
        </button>
      </div>
    </form>
    <button
      [attr.data-modal-hide]="modal_id"
      (click)="addFile = false"
      type="button"
      class="text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      Cerrar
    </button>
  </app-base-modal-form>`,
})
export class UpdateCvModalFormComponent implements OnInit, OnChanges {
  modal_id: string = 'update-cv-modal-form';
  @Input() id!: string;
  @Input() title!: string;
  @Input() talentFileList: ICarouselItem[] = [];
  cvFile!: ICarouselItem | undefined;

  addFile: boolean = false;

  fileForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private talentDetailService: TalentDetailService,
    private sanitizer: DomSanitizer
  ) { }

  // @ViewChild(CancelSaveButtonsComponent) cancelSaveButtonsComponent!: CancelSaveButtonsComponent;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['talentFileList'] && changes['talentFileList'].currentValue) {
      this.talentFileList = changes['talentFileList'].currentValue;
      this.cvFile = this.talentFileList.find((item) =>
        item.fileName.toLowerCase().includes('cv')
      );
    }
  }

  ngOnInit(): void {
    this.formBuild();
  }

  formBuild() {
    this.fileForm = this.fb.group({
      file: [
        '',
        [
          CustomValidators.required,
          CustomValidators.fileSizeValidator(5 * 1024 * 1024),
        ],
      ],
    });
  }

  cancelForm() {
    this.fileForm.reset();
    this.handleAddFile();
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
          file: base64File,
          fileName: fileName,
          fileType: fileType,
        };
        // Now you can send the fileData object
        console.log(fileData);
        if (this.cvFile) {
          // Add this check
          this.talentDetailService.updateCvFileForCurrentTalent(
            this.cvFile.id,
            fileData
          );
        }
        this.fileForm.reset();
        this.addFile = false;
        document.getElementById(this.modal_id)?.classList.add('bg-gray-900/55', 'inset-0', 'fixed');
      };
      reader.readAsDataURL(file);
      // console.log(this.fileForm.value);
    } else {
      console.log('form is not valid');
    }
  }

  sanitizePdfUrl(base64Data: string) {
    const base64Url = base64Data.split(',')[1];
    const byteCharacters = atob(base64Url);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  handleAddFile() {
    this.addFile = !this.addFile;
    // console.log(this.addFile);
  }
}
