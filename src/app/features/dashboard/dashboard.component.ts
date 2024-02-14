import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initDropdowns, initModals } from 'flowbite';
import { MasterService } from 'src/app/services/master/master.service';
import { Master } from 'src/app/shared/models/entities';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { FakeProfiles } from 'src/app/shared/models/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  profiles = FakeProfiles;
  data: Level[] = [];

  constructor(private router: Router, private masterService: MasterService) { }

  ngAfterViewInit(): void {
    initDropdowns();
    initModals();
  }

  ngOnInit(): void {
    this.masterService.getLevel('niveles').subscribe(niveles => {
      this.data = niveles
    });
  }

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
