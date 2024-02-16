import { Component, Input, OnInit } from "@angular/core";

interface Image {
  url: string;
  alt: string;
  width: number,
  height: number,
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  @Input() variant!: string;
  @Input() maxRatting: number = 5;
  @Input() SelectedStar: number = 0;
  @Input() name!: string;
  @Input() image!: string;
  @Input() stack!: string;
  @Input() iconEditImg?: boolean;
  @Input() location!: string;
  @Input() initialMont!: number;
  @Input() finalMont!: number;
  @Input() iconEditMont?: boolean;
  @Input() feedbackNumber?: number;
  @Input() options?: boolean;

  maxRattingArr: any = [];
  previousSelection: number = 0;

  constructor() { }

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
