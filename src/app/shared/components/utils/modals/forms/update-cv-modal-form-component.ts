import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { CustomValidators } from '../../Validations/CustomValidators';
import { ICarouselItem } from '../../carousel/ICarousel-metadata';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update-cv-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Modifica el CV actual"
    description="Aqui puedes ver el CV del talento o tambien actualizarlo."
  >
    <form [formGroup]="fileForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-2">
      <div *ngIf="cvFile" class="flex flex-shrink-0 relative w-full border-2 border-gray-100 rounded-md">
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
          <h2
            class="lg:text-xl leading-4 text-base lg:leading-5 text-slate-800"
          >
            {{cvFile.fileName}}
          </h2>
          <div class="flex h-full items-end pb-6">
            <h3
              class="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-slate-800"
            >
              {{cvFile.fileType.toUpperCase()}}
            </h3>
          </div>
        </a>
      </div>
      <app-file-input
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

      <app-cancel-save-buttons
        [form]="fileForm"
        [modal_id]="modal_id"
        [save_button_id]="'save_file'"
        (cancelClicked)="(fileForm.reset)"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class UpdateCvModalFormComponent implements OnInit, OnChanges {
  modal_id: string = 'update-cv-modal-form';
  @Input() id!: string;
  @Input() title!: string;
  @Input() talentFileList: ICarouselItem[] = [];
  cvFile!: ICarouselItem | undefined;

  fileForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private talentDetailService: TalentDetailService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['talentFileList'] && changes['talentFileList'].currentValue) {
      this.talentFileList = changes['talentFileList'].currentValue;
      this.cvFile = this.talentFileList.find(item => item.fileName.toLowerCase().includes('cv'));
    }
  }

  ngOnInit(): void {
    this.formBuild();
    // console.log(this.talentFileList)
    // this.cvFile = this.talentFileList.find(item => item.fileName.toLowerCase().includes('cv'));
    // console.log(this.cvFile);
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

  onSubmit() {
    if (this.fileForm.valid) {
      const file = this.fileForm.get('file')?.value;
      if (file) {
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
          this.talentDetailService.addFileToCurrentTalent(fileData);
        };
        reader.readAsDataURL(file);
      }
      this.fileForm.reset();
    }
  }

  sanitizePdfUrl(base64Data: string) {
    const base64Url = base64Data.split(",")[1];
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


  updateTalentFileLista(talentFileList: ICarouselItem[]) {
    this.talentFileList = talentFileList;
  }
}
