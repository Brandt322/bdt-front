import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-profile-pic-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Modifica la foto de perfil"
    description="Sube una nueva foto de perfil."
  >
    <form action="">
      <app-file-input
        [id]="'new-profile-pic'"
        title="Sube una foto de perfil"
        description="PNG o JPG (Max. 800x400 px)"
        accept="image/png, image/jpeg"
      ></app-file-input>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save_'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class NewProfilePicModalFormComponent {
  modal_id: string = 'new-profile-pic-modal';
  @Input() id!: string;
  @Input() title!: string;
}
