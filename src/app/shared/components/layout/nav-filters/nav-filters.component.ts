import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { MASTER_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { MasterService } from 'src/app/services/master/master.service';
import { Level } from 'src/app/shared/models/interfaces/level-interface';

@Component({
  selector: 'app-nav-filters',
  templateUrl: './nav-filters.component.html',
  styleUrls: ['./nav-filters.component.css'],
})
export class NavFiltersComponent implements OnInit {
  data: Level[] = [];
  isOpen: boolean = false;
  constructor(private router: Router, private masterService: MasterService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.masterService
      .getLevel(MASTER_API_ENDPOINTS.LEVELS)
      .pipe(
        catchError((error) => {
          this.toastr.error('Error al obtener los niveles', 'Error');
          return throwError(() => error);
        })
      )
      .subscribe((niveles) => {
        this.data = niveles;
        this.toastr.success('Niveles obtenidos correctamente', 'Éxito');
      });
  }


  // requestOptions() {
  //   this.loader.showLoader();

  //   const languageRequest = this.masterService.getLanguage(
  //     MASTER_API_ENDPOINTS.LANGUAGES
  //   );
  //   const levelRequest = this.masterService.getLevel(
  //     MASTER_API_ENDPOINTS.LEVELS
  //   );
  //   const currencyRequest = this.masterService.getCurrency(
  //     MASTER_API_ENDPOINTS.CURRENCIES
  //   );
  //   const countryRequest = this.masterService.getCountry(
  //     MASTER_API_ENDPOINTS.COUNTRIES
  //   );
  //   const cityRequest = this.masterService.getCity(MASTER_API_ENDPOINTS.CITIES);
  //   const citiesByCountryRequest = this.masterService.getCitiesByCountry(
  //     MASTER_API_ENDPOINTS.COUNTRIES,
  //     'A',
  //     MASTER_API_ENDPOINTS.CITIES
  //   );
  //   const profileRequest = this.masterService.getProfile(
  //     MASTER_API_ENDPOINTS.PROFILES
  //   );

  //   forkJoin([
  //     languageRequest,
  //     levelRequest,
  //     currencyRequest,
  //     countryRequest,
  //     cityRequest,
  //     profileRequest
  //   ])
  //     .pipe(
  //       catchError((error) => {
  //         return throwError(() => error);
  //       }),
  //       finalize(() => this.loader.hideLoader())
  //     )
  //     .subscribe(([languages, levels, currencies, countries, cities, profileRequest]) => {
  //       this.languageOptions = languages;
  //       this.levelOptions = levels;
  //       this.currencyOptions = currencies;
  //       this.countryOptions = countries;
  //       this.prefixOptions = countries;
  //       this.cityOptions = [];
  //       this.allCities = cities;
  //       this.profilesOptions = profileRequest;
  //     });
  // }

  onButtonClick() {
    this.router.navigate(['/main/new-talent']);
  }

  isNavOpen() {
    this.isOpen = !this.isOpen;
  }
}
