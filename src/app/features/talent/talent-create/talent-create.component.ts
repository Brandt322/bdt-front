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
import { Language } from '../../../shared/models/interfaces/language.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TalentRequest } from 'src/app/shared/models/interfaces/talent.interface';
import { TalentService } from 'src/app/services/talent/talent.service';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/shared/models/interfaces/profile.interface';

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
  prefixOptions: Country[] = [];
  countryOptions: Country[] = [];
  allCities: City[] = [];
  cityOptions: City[] = [];
  citiesByCountryOptions: City[] = [];
  cities: City[] = [];
  profilesOptions: Profile[] = [];
  createTalentForm!: FormGroup;

  technicalSkillsNumber: number[] = [0];
  softSkillsNumber: number[] = [0];
  fileListNumber: number[] = [0];
  languageListNumber: number[] = [0];

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
    private talentService: TalentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.requestOptions();
    this.buildForm();
    this.addNewTechnicalSkill();
    this.addNewSoftSkill();
    this.addNewFile();
    this.addNewLanguage();
  }

  buildForm(): void {
    this.createTalentForm = this.formBuilder.group({
      filesList: this.formBuilder.array([]),
      image: ['', [Validators.required, this.fileSizeValidator(5 * 1024 * 1024)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      paternalSurname: ['', [Validators.required, Validators.minLength(3)]],
      maternalSurname: ['', [Validators.required, Validators.minLength(3)]],
      callPrefix: ['', [Validators.required]],
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
      technicalSkillsList: this.formBuilder.array([]),
      softSkillsList: this.formBuilder.array([]),
      countryId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      currencyId: ['', Validators.required],
      profileId: ['', Validators.required],
      workExperiencesList: this.formBuilder.array([this.createWorkExperience()]),
      educationalExperiencesList: this.formBuilder.array([this.createEducationalExperience()]),
      languagesList: this.formBuilder.array([]),
    }, { validators: this.amountValidator() });
  }

  amountValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const initialAmount = group.get('initialAmount')?.value;
      const finalAmount = group.get('finalAmount')?.value;

      return finalAmount > initialAmount ? null : { 'amountInvalid': true };
    };
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
    let control: AbstractControl | null;
    if (field.includes('.')) {
      const [arrayName, arrayIndex, controlName] = field.split('.');
      const index = Number(arrayIndex);
      if (isNaN(index)) return false;
      control = ((this.createTalentForm.get(arrayName) as FormArray).controls[index] as FormGroup).get(controlName);
    } else {
      control = this.createTalentForm.get(field);
    }
    return (control?.touched && control?.invalid) ?? false;
  }

  getFieldError(field: string): string | null {
    let control: AbstractControl | null;
    let fieldName = field;
    if (field.includes('.')) {
      const [arrayName, arrayIndex, controlName] = field.split('.');
      const index = Number(arrayIndex);
      if (isNaN(index)) return null;
      control = ((this.createTalentForm.get(arrayName) as FormArray).controls[index] as FormGroup).get(controlName);
      fieldName = controlName;
    } else {
      control = this.createTalentForm.get(field);
    }

    if (!control) return null;

    const errors = control.errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `El campo ${fieldName} es requerido`;
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
        case 'pattern':
          return `El campo ${fieldName} debe ser una URL válida`;
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

  async onSubmit(): Promise<void> {
    if (this.createTalentForm.invalid) {
      this.createTalentForm.markAllAsTouched();
      Object.keys(this.createTalentForm.controls).forEach(field => {
        const control = this.createTalentForm.get(field);
        if (control && control.invalid) {
          const errors = control.errors;
          if (errors) {
            Object.keys(errors).forEach(key => {
              const error = this.getFieldError(field);
              if (error) {
                this.toastr.error(error, '¡Error de validación!');
              }
            });
          }
        }
      });
      return;
    }

    const formValues: { [key: string]: any } = this.createTalentForm.value;
    const phoneNumberWithPrefix = `${formValues['callPrefix']} ${formValues['cellPhoneNumber']}`;
    formValues['cellPhoneNumber'] = phoneNumberWithPrefix;
    const profileFile: File = formValues['image'];
    if (profileFile) {
      try {
        formValues['image'] = await this.convertFileToBase64(profileFile);
      } catch (error) {
        console.error(error);
        this.toastr.error('Ocurrió un error al leer el archivo', '¡Error!');
        return;
      }
    }

    const fileList: File[] = formValues['filesList'].map((fileGroup: any) => fileGroup.file);
    for (let i = 0; i < fileList.length; i++) {
      try {
        formValues['filesList'][i].file = await this.convertFileToBase64(fileList[i]);
        formValues['filesList'][i].fileName = fileList[i].name;
        formValues['filesList'][i].fileType = fileList[i].type;
      } catch (error) {
        console.error(error);
        this.toastr.error(`Ocurrió un error al leer el archivo ${i + 1}`, '¡Error!');
        return;
      }
    }

    this.sendFormData(formValues);
  }

  sendFormData(formValues: { [key: string]: any }): void {
    const talent: Partial<TalentRequest> = formValues; // Obtiene los valores del formulario y hace que las props sean opcionales
    this.talentService.createtalent(talent as TalentRequest).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Talento creado exitosamente', '¡Éxito!');
        this.router.navigate(['/main']);
      },
      (error) => {
        console.error(error);
        this.toastr.error('Ocurrió un error al crear el talento', '¡Error!');
      }
    );
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          resolve((e.target.result as string).split(',')[1]);
        } else {
          reject('No se pudo leer el archivo');
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  createWorkExperience(): FormGroup {
    return this.formBuilder.group({
      company: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  createEducationalExperience(): FormGroup {
    return this.formBuilder.group({
      educationalInstitute: ['', [Validators.required, Validators.minLength(3)]],
      career: ['', [Validators.required, Validators.minLength(3)]],
      degree: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  addNewTechnicalSkill() {
    this.technicalSkillsNumber.push(this.technicalSkillsNumber.length);
    const technicalSkills = this.createTalentForm.get('technicalSkillsList') as FormArray;
    technicalSkills.push(this.formBuilder.group({
      skill: ['', [Validators.required, Validators.minLength(3)]],
      years: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
    }));
  }

  addNewSoftSkill() {
    this.softSkillsNumber.push(this.softSkillsNumber.length);
    const softSkills = this.createTalentForm.get('softSkillsList') as FormArray;
    softSkills.push(this.formBuilder.group({
      skill: ['', [Validators.required, Validators.minLength(4)]],
    }));
  }

  addNewLanguage() {
    this.languageListNumber.push(this.languageListNumber.length);
    const languages = this.createTalentForm.get('languagesList') as FormArray;
    languages.push(this.formBuilder.group({
      languageId: ['', [Validators.required]],
      levelId: ['', [Validators.required]],
      numberOfStars: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    }));
  }

  addNewFile() {
    this.fileListNumber.push(this.fileListNumber.length);
    const files = this.createTalentForm.get('filesList') as FormArray;
    files.push(this.formBuilder.group({
      file: ['', [Validators.required, this.fileSizeValidator(5 * 1024 * 1024)]],
    }));
  }

  deleteTechnicalSkill() {
    const technicalSkills = this.createTalentForm.get('technicalSkillsList') as FormArray;
    if (technicalSkills.length > 1) {
      technicalSkills.removeAt(technicalSkills.length - 1);
      this.technicalSkillsNumber.pop();
    }
  }

  deleteSoftSkill() {
    const softSkills = this.createTalentForm.get('softSkillsList') as FormArray;
    if (softSkills.length > 1) {
      softSkills.removeAt(softSkills.length - 1);
      this.softSkillsNumber.pop();
    }
  }

  deleteFile() {
    const files = this.createTalentForm.get('filesList') as FormArray;
    if (files.length > 1) {
      files.removeAt(files.length - 1);
      this.fileListNumber.pop();
    }
  }

  deleteLanguage() {
    const languages = this.createTalentForm.get('languagesList') as FormArray;
    if (languages.length > 1) {
      languages.removeAt(languages.length - 1);
      this.languageListNumber.pop();
    }
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
    const profileRequest = this.masterService.getProfile(
      MASTER_API_ENDPOINTS.PROFILES
    );

    forkJoin([
      languageRequest,
      levelRequest,
      currencyRequest,
      countryRequest,
      cityRequest,
      profileRequest
    ])
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(([languages, levels, currencies, countries, cities, profileRequest]) => {
        this.languageOptions = languages;
        this.levelOptions = levels;
        this.currencyOptions = currencies;
        this.countryOptions = countries;
        this.prefixOptions = countries;
        this.cityOptions = [];
        this.allCities = cities;
        this.profilesOptions = profileRequest;
      });
  }

  get languageList(): FormArray {
    return this.createTalentForm.get('languagesList') as FormArray;
  }

  get workExperiencesList(): FormArray {
    return this.createTalentForm.get('workExperiencesList') as FormArray;
  }

  get educationalExperiencesList(): FormArray {
    return this.createTalentForm.get('educationalExperiencesList') as FormArray;
  }

  get softSkills(): FormArray {
    return this.createTalentForm.get('softSkillsList') as FormArray;
  }

  get technicalSkills(): FormArray {
    return this.createTalentForm.get('technicalSkillsList') as FormArray;
  }

  get fileList(): FormArray {
    return this.createTalentForm.get('filesList') as FormArray;
  }

  handleInputChangeArray({ id, value, arrayName }: { id: string, value: string, arrayName: string }) {
    const formArray = this.createTalentForm.get(arrayName) as FormArray;
    if (formArray) {
      for (let i = 0; i < formArray.length; i++) {
        const control = formArray.at(i).get(id);
        if (control) {
          control.setValue(value);
          console.log(`El valor del control '${id}' en el array '${arrayName}' es ahora '${control.value}'`);
          return;
        }
      }
    }
    console.log(`No se encontró el control con el id '${id}' en el array '${arrayName}'`);
  }

  onPrefixSelected(prefix: string) {
    const prefixControl = this.createTalentForm.get('callPrefix');
    if (prefixControl) {
      prefixControl.setValue(prefix);
      console.log(prefixControl.value)
    }
  }

  onProfileSelected(profileId: number | null) {
    const profileControl = this.createTalentForm.get('profileId');
    if (profileControl) {
      profileControl.setValue(profileId);
    }
  }

  onCountrySelected(countryId: number | null) {
    this.cityOptions = this.allCities.filter(city => Number(city.countryId) === countryId);
    const countryControl = this.createTalentForm.get('countryId');
    const cityControl = this.createTalentForm.get('cityId');
    if (countryControl) {
      countryControl.setValue(countryId);
    }
    if (cityControl) {
      cityControl.setValue(null); // Reset the city field when a new country is selected
    }
  }

  onCitySelected(cityId: number | null) {
    const cityControl = this.createTalentForm.get('cityId');
    if (cityControl) {
      cityControl.setValue(cityId);
    }
  }

  onLanguageSelected(languageId: number | null, index: number) {
    const languageControl = (this.createTalentForm.get('languagesList') as FormArray).at(index).get('languageId');
    if (languageControl) {
      languageControl.setValue(languageId);
      console.log('Language selected:', languageId);
    }
  }

  onLevelSelected(levelId: number | null, index: number) {
    const levelControl = (this.createTalentForm.get('languagesList') as FormArray).at(index).get('levelId');
    if (levelControl) {
      levelControl.setValue(levelId);
      console.log('Level selected:', levelId);
    }
  }

  onRatingChange(rating: number, index: number) {
    const languageControl = (this.createTalentForm.get('languagesList') as FormArray).at(index).get('numberOfStars');
    if (languageControl) {
      languageControl.setValue(rating);
    }
  }

  onCurrencySelected(currencyId: number) {
    const currencyControl = this.createTalentForm.get('currencyId');
    if (currencyControl) {
      currencyControl.setValue(Number(currencyId));
    }
  }

  onButtonClick() {
    this.router.navigate(['/main']);
  }

  onItemSelected(event: any): void {
    this.selectedItemId = event.target.value;
    console.log('ID seleccionado:', this.selectedItemId);
  }
}
