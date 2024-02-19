import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-modal-form',
  template: ` <app-base-modal-form
    [id]="modal_id"
    title="{{ title }}"
    description="{{ description }}"
  >
    <form action="">
      <div class="grid gap-4 mb-8">
        <div class="flex items-center justify-start">
          <app-rating
            [maxRating]="5"
            [ngClass]="'flex items-center'"
          ></app-rating>
        </div>
        <app-textarea-select></app-textarea-select>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save-feedback'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class FeedbackModalFormComponent implements OnInit {
  modal_id: string = 'feedback-modal-form';
  @Input() title!: string;
  @Input() description!: string;

  ngOnInit(): void { }
}
