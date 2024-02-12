import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-modal-form',
  template: ` <app-base-modal-form
    [id]="modal_id"
    title="{{ title }}"
    description="{{ description }}"
  >
    <form action="">
      <div class="grid gap-4 mb-8">
        <app-language-select></app-language-select>
        <app-language-level-select></app-language-level-select>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save-experience'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class LanguageModalFormComponent {
  modal_id: string = 'language-modal-form';
  @Input() title!: string;
  @Input() description!: string;
}
