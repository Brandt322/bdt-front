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
          <div
            class="flex items-center"
            *ngFor="let icon of maxRattingArr; let index = index"
            [ngClass]="{ checked: SelectedStar > index }"
            (mouseenter)="HandleMouseEnter(index)"
            (mouseleave)="HandleMouseLeave()"
            (click)="HandleClickRating(index)"
          >
            <span class="fa fa-star puntero mr-2"></span>
          </div>
        </div>
        <app-textarea-select></app-textarea-select>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save-feedback'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
  styles: [
    `
      .checked {
        color: orange;
      }

      .puntero {
        cursor: pointer;
      }
    `,
  ],
})
export class FeedbackModalFormComponent implements OnInit {
  modal_id: string = 'feedback-modal-form';
  @Input() title!: string;
  @Input() description!: string;
  @Input() maxRatting: number = 5;
  @Input() SelectedStar: number = 0;

  maxRattingArr: any = [];
  previousSelection: number = 0;


  ngOnInit(): void {
    this.maxRattingArr = Array(this.maxRatting).fill(0);
  }

  HandleMouseEnter(index: number) {
    this.SelectedStar = index + 1;
  }

  HandleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection;
    } else {
      this.SelectedStar = 0;
    }
  }

  HandleClickRating(index: number) {
    this.SelectedStar = index + 1;
    this.previousSelection = this.SelectedStar;
  }
}
