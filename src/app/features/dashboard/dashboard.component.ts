import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initDropdowns, initModals } from 'flowbite';
import { FakeProfiles } from 'src/app/shared/models/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  profiles = FakeProfiles;


  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    initDropdowns();
    initModals();
  }

  ngOnInit(): void { }



  onButtonClick() {
    this.router.navigate(['/main/new-talent']);
  }

  modalTitle: string = '';
  modalDescription: string = '';

  setModalData(title: string, description: string) {
    this.modalTitle = title;
    this.modalDescription = description;
  }
}
