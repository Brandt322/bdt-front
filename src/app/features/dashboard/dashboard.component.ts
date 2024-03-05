import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { catchError, throwError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { TalentResponse } from '../../shared/models/interfaces/talent.interface';
import { ToastrService } from 'ngx-toastr';
import { TalentDetailService } from '../services/talent-detail.service';
import { LoaderService } from 'src/app/core/global/loader/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  talents: TalentResponse[] = [];
  selectedTalent!: TalentResponse;
  isFiltered: boolean = false;

  constructor(private talentService: TalentService, private toastr: ToastrService, private talentDetailService: TalentDetailService, private loader: LoaderService) {
  }

  ngAfterViewInit(): void {
    initDropdowns();
    initModals();
  }

  ngOnInit(): void {

    this.talentService.getTalent().subscribe((talents: TalentResponse[]) => {
      this.talentDetailService.updateTalentList(talents);
      this.isFiltered = false;
    });

    this.talentDetailService.talentList$.pipe(
      catchError((error) => {
        this.toastr.error('Error al obtener los talentos', 'Error');
        return throwError(() => error);
      })
    ).subscribe((talents) => {
      // this.talents = talents.reverse().slice(0, 5);
      this.talents = talents.reverse();
      if (!this.isFiltered) {
        this.talents = this.talents.slice(0, 5);
      }
      // this.toastr.success('Talentos obtenidos correctamente', 'Éxito');
      if (this.talents.length > 0) {
        this.selectedTalent = this.talents[0]; // Selecciona el primer talento
        this.onTalentClick(this.talents[0]);
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

  onTalentClick(talent: TalentResponse) {
    this.loader.showLoader();
    this.selectedTalent = talent; // Actualiza el talento seleccionado cuando se hace clic en un talento
    this.talentDetailService.changeTalent(talent.id);
    this.loader.hideLoader();
  }
}
