import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { BehaviorSubject, Subject, catchError, filter, takeUntil, throwError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { BasicTalentResponse, FilterTalentResponse, TalentResponse } from '../../shared/models/interfaces/talent.interface';
import { ToastrService } from 'ngx-toastr';
import { TalentDetailService } from '../services/talent-detail.service';
import { LoaderService } from 'src/app/core/global/loader/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  talents$: BehaviorSubject<BasicTalentResponse[]> = new BehaviorSubject<BasicTalentResponse[]>([]);
  selectedTalent$: BehaviorSubject<BasicTalentResponse | null> = new BehaviorSubject<BasicTalentResponse | null>(null);

  isFiltered: boolean = false;

  private destroy$ = new Subject<void>();

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
    this.talentService.getBasicTalent().pipe(takeUntil(this.destroy$)).subscribe((talents: BasicTalentResponse[]) => {
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
      if (this.talents$.getValue() !== talents) {
        this.talents$.next(talents.reverse());
        if (!this.isFiltered) {
          this.talents$.next(this.talents$.getValue().slice(0, 5));
        }
        if (this.talents$.getValue().length > 0) {
          this.selectedTalent$.next(this.talents$.getValue()[0]);
          this.onTalentClick(this.talents$.getValue()[0]);
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
        console.log('Talento seleccionado actualizado' + updatedTalent.id)
        this.selectedTalent$.next(updatedTalent);
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

  onTalentClick(talent: BasicTalentResponse) {
    this.loader.showLoader();
    this.selectedTalent$.next(talent);// Actualiza el talento seleccionado cuando se hace clic en un talento
    this.talentDetailService.changeTalent(talent.id);
    this.loader.hideLoader();
  }
}
