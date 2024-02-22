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
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
    this.buildForm();
  }

  buildForm(): void {
    this.createTalentForm = this.formBuilder.group({
      cv: ['', [Validators.required, this.fileSizeValidator(5 * 1024 * 1024)]],
      profile: ['', [Validators.required, this.fileSizeValidator(5 * 1024 * 1024)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      paternalSurname: ['', [Validators.required, Validators.minLength(3)]],
      maternalSurname: ['', [Validators.required, Validators.minLength(3)]],
      cellPhoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      linkedinLink: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(https?://)?([www.]+)?linkedin.com/(in|pub)/[a-zA-Z0-9_-]+(/)?$'
          ),
        ],
      ],
      githubLink: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(https?://)?(www.)?github.com/[a-zA-Z0-9_-]+(/)?$'
          ),
        ],
      ],
      initialAmount: [0, [Validators.required, Validators.min(1000), Validators.max(20000)]],
      finalAmount: [0, [Validators.required, Validators.min(1000), Validators.max(20000)]],
    });
  }

  fileSizeValidator(maxSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file && file.size > maxSize) {
        return { 'fileSize': { value: 'El tamaño del archivo es demasiado grande' } };
      }
      return null;
    };
  }

  isValidField(field: string): boolean {
    const control = this.createTalentForm.controls[field];
    return control ? control.errors !== null && control.touched : false;
  }

  getFieldError(field: string): string | null {
    if (!this.createTalentForm.controls[field]) return null;

    const errors = this.createTalentForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `El campo ${field} es requerido`;
        case 'minlength':
          if (field === 'cellPhoneNumber') {
            return `Debe tener mínimo ${errors['minlength'].requiredLength} dígitos`;
          } else {
            return `Debe tener mínimo ${errors['minlength'].requiredLength} letras`;
          }
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
        case 'max':
          return `El valor máximo es ${errors['max'].max}`;
        case 'fileSize':
          return 'El tamaño del archivo es demasiado grande';
        default:
          return null;
      }
    }
    return null;
  }

  //Testeando el envio formulario
  logFormValues() {
    if (this.createTalentForm.invalid) {
      this.createTalentForm.markAllAsTouched();
      return;
    } else {
      console.log(this.createTalentForm.value);
    }
  }

  onSubmit(): void {
    const formValues: { [key: string]: any } = this.createTalentForm.value;
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

  sendFormData(formValues: { [key: string]: any }): void {
    const talent: Partial<Talent> = formValues; // Obtiene los valores del formulario y hace que las props sean opcionales
    this.talentService.createtalent(talent as Talent).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
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
