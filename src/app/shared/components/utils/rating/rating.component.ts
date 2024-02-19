import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() maxRating: number = 5;
  @Output() ratingChange = new EventEmitter<number>();
  ratingArray: any[] = [];
  selectedStar: number = 0;
  previousSelection: number = 0;

  ngOnInit(): void {
    this.ratingArray = Array(this.maxRating).fill(0);
  }

  handleMouseEnter(index: number) {
    this.selectedStar = index + 1;
  }

  handleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.selectedStar = this.previousSelection;
    } else {
      this.selectedStar = 0;
    }
  }

  handleClickRating(index: number) {
    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar;
    this.ratingChange.emit(this.selectedStar);
  }

  onRatingChange(rating: number) {
    console.log('Rating changed: ', rating);
  }
}
