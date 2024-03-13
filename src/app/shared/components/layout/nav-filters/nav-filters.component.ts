import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, forkJoin, tap, throwError } from 'rxjs';
import { MASTER_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { LoaderService } from 'src/app/core/global/loader/loader.service';
import { MasterService } from 'src/app/services/master/master.service';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { TalentService } from 'src/app/services/talent/talent.service';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { FilterTalentResponse } from 'src/app/shared/models/interfaces/talent.interface';

@Component({
  selector: 'app-nav-filters',
  templateUrl: './nav-filters.component.html',
  styleUrls: ['./nav-filters.component.css'],
})
export class NavFiltersComponent implements OnInit {
  isOpen: boolean = false;
  levels: Level[] = [];
  skills: string[] = [];
  myForm!: FormGroup;
  @Output() isFiltered = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private masterService: MasterService,
    private talentService: TalentService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private formBuilder: FormBuilder,
    private talentListService: TalentDetailService
  ) { }

  ngOnInit(): void {
    this.requestOptions();
    this.buildForm()
  }

  onSave() {
    let formValue = { ...this.myForm.value };

    // Si 'technicalSkills' está vacío, establecerlo en null
    if (this.myForm && this.myForm.get('technicalSkills') && this.myForm.get('technicalSkills')?.value?.length === 0) {
      formValue.technicalSkills = null;
    }

    // Si 'data' está vacío, establecerlo en null
    if (this.myForm && this.myForm.get('data') && this.myForm.get('data')?.value?.trim() === '') {
      formValue.data = null;
    }

    console.log(formValue);
    this.talentService.getTalentsByTechnicalSkillsLanguageAndLevel(formValue)
      .pipe(
        tap((response: FilterTalentResponse[]) => {
          if (response.length === 0) {
            this.toastr.info('No hay registros de ese tipo', 'Información');
          } else {
            this.isFiltered.emit(true);
            this.talentListService.updateTalentList(response);
          }
        }),
        catchError((error) => {
          console.error(error);
          this.toastr.error('Error al obtener los talentos', 'Error');
          return throwError(error);
        })
      )
      .subscribe();
  }

  buildForm(): void {
    this.myForm = this.formBuilder.group({
      languageId: [null],
      levelId: [null],
      technicalSkills: [this.formBuilder.array([])],
      data: ['']
    })
  }

  handleOptionSelected(index: number | null) {
    if (index !== null) {
      const selectedLevelId = this.levels[index].id;

      // Establece el valor de 'levelId' en el formulario
      this.myForm.get('levelId')?.setValue(selectedLevelId);

      if (selectedLevelId) {
        this.myForm.get('languageId')?.setValue(2);
      } else {
        this.myForm.get('languageId')?.setValue(null);
        this.myForm.get('levelId')?.setValue(null);
      }
    } else {
      // Si el índice es null, resetea los valores de 'languageId' y 'levelId'
      this.myForm.get('languageId')?.reset();
      this.myForm.get('levelId')?.reset();
    }
  }

  get technicalSkills(): FormArray {
    return this.myForm.get('technicalSkills') as FormArray;
  }

  onButtonClick() {
    this.router.navigate(['/main/new-talent']);
  }

  isNavOpen() {
    this.isOpen = !this.isOpen;
  }

  requestOptions() {
    this.loader.showLoader();

    const skillRequest = this.masterService.getSkills(
      MASTER_API_ENDPOINTS.SKILLS
    );
    const levelRequest = this.masterService.getLevel(
      MASTER_API_ENDPOINTS.LEVELS
    );


    forkJoin([
      skillRequest,
      levelRequest,
    ])
      .pipe(
        catchError((error) => {
          this.toastr.error('Error al obtener los niveles', 'Error');
          return throwError(() => error);
        }),
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(([skills, levels]) => {
        this.skills = skills;
        this.levels = levels;
        // this.toastr.success('Niveles obtenidos correctamente', 'Éxito');
      });
  }
}
