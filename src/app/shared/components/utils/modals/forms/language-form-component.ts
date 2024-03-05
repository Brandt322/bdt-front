import { Component, Input } from '@angular/core';
import { LanguageRequest } from 'src/app/shared/models/interfaces/language.interface';

@Component({
  selector: 'app-language-modal-form',
  template: ` <app-base-modal-form
    [id]="modal_id"
    title="{{ title }}"
    description="{{ description }}"
  >
    <form>
      <div class="grid gap-4 mb-8">
        <app-language-select [id]="'languageId'"></app-language-select>
        <app-language-level-select [id]="'levelId'"></app-language-level-select>
        <div class="flex items-center justify-start mt-1">
        <app-rating
            [maxRating]="5"
            [currentRating]="rating"
            [ngClass]="'flex items-center'"
          ></app-rating>
        </div>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save-experience'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`
})
export class LanguageModalFormComponent {
  @Input() modal_id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() rating!: number;
  // @Input() language!: LanguageRequest;
}
