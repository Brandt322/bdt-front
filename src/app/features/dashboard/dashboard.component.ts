import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { BehaviorSubject, Subject, catchError, takeUntil, throwError } from 'rxjs';
import { BasicTalentResponse, TalentResponse } from '../../shared/models/interfaces/talent.interface';
import { ToastrService } from 'ngx-toastr';
import { TalentService } from 'src/app/services/talent/talent.service';
import { TalentDetailService } from '../services/talent-detail.service';
import { LoaderService } from 'src/app/core/global/loader/loader.service';
import { SharedDataService } from 'src/app/shared/components/services/shared-data-service.service';
import { UserPrincipal } from '../../shared/models/interfaces/user.interface';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  talents$: BehaviorSubject<BasicTalentResponse[]> = new BehaviorSubject<BasicTalentResponse[]>([]);
  selectedTalent$: BehaviorSubject<BasicTalentResponse | null> = new BehaviorSubject<BasicTalentResponse | null>(null);

  isFiltered: boolean = false;
  hasRecords = true;
  private destroy$ = new Subject<void>();

  constructor(
    private talentService: TalentService,
    private toastr: ToastrService,
    private talentDetailService: TalentDetailService,
    private loader: LoaderService,
    private sharedDataService: SharedDataService,
    private userService: UserService
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   initModals();
    //   initDropdowns();
    // }, 0);
    // initDropdowns();
    // initModals();

  }
  currentTalentId!: number;
  ngOnInit(): void {
    this.initializeState();
  }

  userDetails!: UserPrincipal;
  initializeState(): void {
    if (sessionStorage.getItem('user_data')) {
      const userData = sessionStorage.getItem('user_data')
        ? JSON.parse(sessionStorage.getItem('user_data') || '{}')
        : {};
      this.userDetails = userData.userPrincipal;
    }

    // this.userService.getListsByUserId(this.userDetails.id).subscribe((response) => {
    //   this.sharedDataService.updateFavoriteList(response.lists);
    // });

    this.talentService.getBasicTalent().pipe(takeUntil(this.destroy$)).subscribe((talents: BasicTalentResponse[]) => {
      this.talentDetailService.updateTalentList(talents);
      this.isFiltered = false;
      setTimeout(() => {
        initModals();
        initDropdowns();
      }, 0);
    });

    this.talentDetailService.talentList$.pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        this.toastr.error('Error al obtener los talentos', 'Error');
        return throwError(() => error);
      })
    ).subscribe((talents) => {
      this.hasRecords = talents.length > 0;
      if (this.hasRecords) {
        if (this.talents$.getValue() !== talents) {
          this.talents$.next(talents.reverse());

          if (!this.isFiltered) {
            this.talents$.next(this.talents$.getValue().slice(0, 5));
          }

          // if (this.talents$.getValue().length > 0) {
          //   this.selectedTalent$.next(this.talents$.getValue()[0]);
          //   this.onTalentClick(this.talents$.getValue()[0]);
          // }

          if (this.talents$.getValue().length > 0) {
            let selectedTalentId = localStorage.getItem('selectedTalentId');
            let selectedTalent = this.talents$.getValue().find(talent => talent.id.toString() === selectedTalentId);
            // Si no hay un talento seleccionado en localStorage o el talento seleccionado no está en los resultados de la búsqueda, selecciona el primer talento
            if (!selectedTalentId || !selectedTalent) {
              selectedTalent = this.talents$.getValue()[0];
              localStorage.setItem('selectedTalentId', selectedTalent.id.toString());
            }

            this.selectedTalent$.next(selectedTalent);
            this.onTalentClick(selectedTalent);
          }
        }
      }
    });

    this.talentDetailService.updatedTalent.pipe(takeUntil(this.destroy$)).subscribe((updatedTalent: TalentResponse) => {
      const talents = this.talents$.getValue();
      const index = talents.findIndex(talent => talent.id === updatedTalent.id);
      if (index !== -1) {
        talents[index] = updatedTalent;
        this.talents$.next(talents);
      }
      // Actualiza el talento seleccionado si es el que se actualizó
      let selectedTalent = this.selectedTalent$.getValue();
      if (selectedTalent !== null && selectedTalent.id === updatedTalent.id) {
        // console.log('Talento seleccionado o actualizado: ' + updatedTalent.id)
        this.selectedTalent$.next(updatedTalent);
      }
      setTimeout(() => {
        initModals();
        initDropdowns();
      }, 0);
    });
  }

  onSearchPerformed() {
    this.isFiltered = true;
    // console.log('Evento searchPerformed recibido, isFiltered establecido:' + this.isFiltered);
  }

  modalTitle: string = '';
  modalDescription: string = '';

  setModalData(title: string, description: string) {
    this.modalTitle = title;
    this.modalDescription = description;
  }

  onTalentClick(talent: BasicTalentResponse) {
    this.loader.showLoader();
    this.selectedTalent$.next(talent);// Actualiza el talento seleccionado cuando se hace clic en un talento
    this.talentDetailService.changeTalent(talent.id);
    localStorage.setItem('selectedTalentId', talent.id.toString());
    this.loader.hideLoader();
  }
}
