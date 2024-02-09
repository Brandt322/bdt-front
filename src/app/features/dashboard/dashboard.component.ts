import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initDropdowns } from 'flowbite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() maxRatting: number = 5;
  @Input() SelectedStar: number = 0;
  maxRattingArr: any = [];
  previousSelection: number = 0
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    initDropdowns();
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

  onButtonClick() {
    this.router.navigate(['/main/new-talent']);
  }
}
