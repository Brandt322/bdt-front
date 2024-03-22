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
import { ListUser, UserPrincipal } from 'src/app/shared/models/interfaces/user.interface';
import { UserService } from 'src/app/auth/services/user.service';
import { SharedDataService } from '../../services/shared-data-service.service';

@Component({
  selector: 'app-nav-filters',
  templateUrl: './nav-filters.component.html',
  styleUrls: ['./nav-filters.component.css'],
})
export class NavFiltersComponent implements OnInit {
  @Output() isFiltered = new EventEmitter<boolean>();
  isOpen: boolean = false;
  levels: Level[] = [];
  skills: string[] = [];
  listByUSer!: ListUser;
  myForm!: FormGroup;
  userDetails!: UserPrincipal;
  searchResult: string = '';

  constructor(
    private router: Router,
    private masterService: MasterService,
    private talentService: TalentService,
    private userService: UserService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private formBuilder: FormBuilder,
    private talentListService: TalentDetailService,
    private sharedService: SharedDataService
  ) { }

  ngOnInit(): void {

    if (sessionStorage.getItem('user_data')) {
      const userData = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data') || '{}') : {};
      this.userDetails = userData.userPrincipal;
    }

    this.sharedService.favoriteList$.subscribe((list) => {
      this.listByUSer = {
        userId: this.userDetails.id,
        lists: list
      };
    });

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
            this.talentListService.updateTalentList([]);
            this.searchResult = '';
          } else {
            this.isFiltered.emit(true);
            this.talentListService.updateTalentList(response);

            const resultText = response.length === 1 ? 'resultado disponible' : 'resultados disponibles';
            // Verificar si el valor del campo de búsqueda es una cadena vacía
            const searchText = this.myForm.get('data')?.value ? ` para "${this.myForm.get('data')?.value}"` : '';
            this.searchResult = `${response.length} ${resultText}${searchText}`;
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

    const listRequest = this.userService.getListsByUserId(this.userDetails.id);


    forkJoin([
      skillRequest,
      levelRequest,
      listRequest
    ])
      .pipe(
        catchError((error) => {
          this.toastr.error('Error al obtener los niveles', 'Error');
          return throwError(() => error);
        }),
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(([skills, levels, favoriteList]) => {
        this.skills = skills;
        this.levels = levels;
        this.listByUSer = favoriteList;
        // this.toastr.success('Niveles obtenidos correctamente', 'Éxito');
      });
  }
}
