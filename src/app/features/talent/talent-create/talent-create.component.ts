import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MASTER_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { LoaderService } from 'src/app/core/global/loader/loader.service';
import { City } from 'src/app/shared/models/interfaces/city.interface';
import { Country } from 'src/app/shared/models/interfaces/country.interface';
import { Currency } from 'src/app/shared/models/interfaces/currency.interface';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { MasterService } from '../../../services/master/master.service';
import Language from '../../../shared/models/interfaces/language.interface';

@Component({
  selector: 'app-talent-create',
  templateUrl: './talent-create.component.html',
  styleUrls: ['./talent-create.component.css'],
})
export class TalentCreateComponent implements OnInit {
  selectedItemId!: number;
  languageOptions: Language[] = [];
  levelOptions: Level[] = [];
  currencyOptions: Currency[] = [];
  countryOptions: Country[] = [];
  cityOptions: City[] = [];
  citiesByCountryOptions: City[] = [];

  technicalSkillsNumber: number[] = [0];
  softSkillsNumber: number[] = [0];

  constructor(
    private router: Router,
    public loader: LoaderService,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.requestOptions();
  }

  addNewTechnicalSkill() {
    this.technicalSkillsNumber.push(0);
  }

  addNewSoftSkill() {
    this.softSkillsNumber.push(0);
  }

  requestOptions() {
    this.loader.showLoader();

    const languageRequest = this.masterService.getLanguage(
      MASTER_API_ENDPOINTS.LANGUAGES
    );
    const levelRequest = this.masterService.getLevel(
      MASTER_API_ENDPOINTS.LEVELS
    );
    const currencyRequest = this.masterService.getCurrency(
      MASTER_API_ENDPOINTS.CURRENCIES
    );
    const countryRequest = this.masterService.getCountry(
      MASTER_API_ENDPOINTS.COUNTRIES
    );
    const cityRequest = this.masterService.getCity(MASTER_API_ENDPOINTS.CITIES);
    const citiesByCountryRequest = this.masterService.getCitiesByCountry(
      MASTER_API_ENDPOINTS.COUNTRIES,
      'A',
      MASTER_API_ENDPOINTS.CITIES
    );

    forkJoin([
      languageRequest,
      levelRequest,
      currencyRequest,
      countryRequest,
      cityRequest,
    ])
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(([languages, levels, currencies, countries, cities]) => {
        this.languageOptions = languages;
        this.levelOptions = levels;
        this.currencyOptions = currencies;
        this.countryOptions = countries;
        this.cityOptions = cities;
      });
  }

  onButtonClick() {
    this.router.navigate(['/main']);
  }

  onItemSelected(event: any): void {
    this.selectedItemId = event.target.value;
    console.log('ID seleccionado:', this.selectedItemId);
  }
}
