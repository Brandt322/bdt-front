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
import { FormBuilder, FormGroup } from '@angular/forms';
import { Talent } from 'src/app/shared/models/interfaces/talent.interface';
import { TalentService } from 'src/app/services/talent/talent.service';

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
  createTalentForm!: FormGroup;

  technicalSkillsNumber: number[] = [0];
  softSkillsNumber: number[] = [0];

  currentDate: Date = new Date();

  currentlyWorkingOnFractal: boolean = false;
  currentlyStudyingOnFractal: boolean = false;

  defaultValue: string = '';

  checkState(isChecked: boolean) {
    this.currentlyWorkingOnFractal = isChecked;
    this.defaultValue = isChecked ? 'Fractal' : '';
    console.log(isChecked);
  }

  constructor(
    private router: Router,
    public loader: LoaderService,
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private talentService: TalentService
  ) { }

  ngOnInit(): void {
    this.requestOptions();
    this.createTalentForm = this.formBuilder.group({
      profile: [''],
      name: [''],
      paternalSurname: [''],
      maternalSurname: [''],
      cellPhoneNumber: [''],
      description: [''],
      linkedinLink: [''],
      githubLink: [''],
      initialAmount: [0],
      finalAmount: [0],
    });
  }

  //Testeando el formulario
  logFormValues() {
    console.log(this.createTalentForm.value);
  }

  onSubmit(): void {
    const formValues: { [key: string]: any; } = this.createTalentForm.value;
    const profileFile: File = formValues['profile'];
    if (profileFile) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          formValues['image'] = (e.target.result as string).split(',')[1];
          this.sendFormData(formValues);
        }
      };
      reader.readAsDataURL(profileFile);
    } else {
      this.sendFormData(formValues);
    }
  }

  sendFormData(formValues: { [key: string]: any; }): void {
    const talent: Partial<Talent> = formValues; // Obtiene los valores del formulario y hace que las props sean opcionales
    this.talentService.createtalent(talent as Talent)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
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
