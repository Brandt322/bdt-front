import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { MasterService } from 'src/app/services/master/master.service';
import { FakeProfiles } from 'src/app/shared/models/types';
import { API_ENDPOINTS } from '../../core/global/constants/api-endpoints';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  profiles = FakeProfiles;

  constructor(private masterService: MasterService) {}

  ngAfterViewInit(): void {
    initDropdowns();
    initModals();
  }

  ngOnInit(): void {
    this.masterService
      .getCountry(API_ENDPOINTS.COUNTRIES)
      .subscribe((paises) => {
        console.log(paises);
      });

    this.masterService
      .getCurrency(API_ENDPOINTS.CURRENCIES)
      .subscribe((coins) => {
        console.log(coins);
      });

    this.masterService.getCity(API_ENDPOINTS.CITIES).subscribe((ciudades) => {
      console.log(ciudades);
    });
  }

  modalTitle: string = '';
  modalDescription: string = '';

  setModalData(title: string, description: string) {
    this.modalTitle = title;
    this.modalDescription = description;
  }
}
