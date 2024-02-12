import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-file-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Modifica la foto de perfil"
    description="Sube un nuevo certificado, diploma o algún archivo que respalde tus aptitudes"
  >
    <form action="">
      <app-file-input
        [id]="'new-file-pic'"
        title="Agrega un archivo"
        description="PDF (Max. 800x400 px)"
        accept="application/pdf"
      ></app-file-input>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save_'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class NewFileModalFormComponent {
  modal_id: string = 'new-file-modal-form';
  @Input() id!: string;
  @Input() title!: string;
}
