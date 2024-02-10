import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initDropdowns } from 'flowbite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    initDropdowns();
  }

  ngOnInit(): void {
  }

  onButtonClick() {
    this.router.navigate(['/main/new-talent']);
  }
}
