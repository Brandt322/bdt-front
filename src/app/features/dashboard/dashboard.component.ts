import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { Subject, catchError, filter, takeUntil, throwError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { FilterTalentResponse, TalentResponse } from '../../shared/models/interfaces/talent.interface';
import { ToastrService } from 'ngx-toastr';
import { TalentDetailService } from '../services/talent-detail.service';
import { LoaderService } from 'src/app/core/global/loader/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  talents: FilterTalentResponse[] = [];
  selectedTalent!: FilterTalentResponse;
  isFiltered: boolean = false;
  private destroy$ = new Subject<void>();
  // private talentListSubscription: Subscription | null = null;

  constructor(
    private talentService: TalentService,
    private toastr: ToastrService,
    private talentDetailService: TalentDetailService,
    private loader: LoaderService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    initDropdowns();
    initModals();
  }

  ngOnInit(): void {
    this.initializeState();
  }

  initializeState(): void {
    this.talentService.getTalent().pipe(takeUntil(this.destroy$)).subscribe((talents: TalentResponse[]) => {
      this.talentDetailService.updateTalentList(talents);
      this.isFiltered = false;
    });

    this.talentDetailService.talentList$.pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        this.toastr.error('Error al obtener los talentos', 'Error');
        return throwError(() => error);
      })
    ).subscribe((talents) => {
      if (this.talents !== talents) {
        this.talents = talents.reverse();
        if (!this.isFiltered) {
          this.talents = this.talents.slice(0, 5);
        }
        if (this.talents.length > 0) {
          this.selectedTalent = this.talents[0]; // Selecciona el primer talento
          this.onTalentClick(this.talents[0]);
        }
      }
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

  onTalentClick(talent: FilterTalentResponse) {
    this.loader.showLoader();
    this.selectedTalent = talent; // Actualiza el talento seleccionado cuando se hace clic en un talento
    this.talentDetailService.changeTalent(talent.id);
    this.loader.hideLoader();
  }
}
