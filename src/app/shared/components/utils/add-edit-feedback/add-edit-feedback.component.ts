import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-feedback',
  templateUrl: './add-edit-feedback.component.html',
  styleUrls: ['./add-edit-feedback.component.css']
})
export class AddEditFeedbackComponent implements OnInit {

  @Input() main_title!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() modal_id!: string;
  @Input() modal_add_title!: string;
  @Input() modal_add_description!: string;
  // @Input() modal_edit_title!: string;
  // @Input() modal_edit_description!: string;
  @Input() has_image!: boolean;
  @Input() number_items!: number;
  @Input() type!: string;
  @Input() maxRatting: number = 5;
  @Input() SelectedStar: number = 0;

  modalTitle: string = '';
  modalDescription: string = '';
  maxRattingArr: any = [];
  previousSelection: number = 0;

  ngOnInit(): void {
    this.maxRattingArr = Array(this.maxRatting).fill(0);
  }

  setAddModalTitle() {
    this.modalTitle = this.modal_add_title;
    this.modalDescription = this.modal_add_description;
  }

  // setEditModalTitle() {
  //   this.modalTitle = this.modal_edit_title;
  //   this.modalDescription = this.modal_edit_description;
  // }

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
