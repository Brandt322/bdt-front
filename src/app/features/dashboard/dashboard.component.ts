import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { catchError, forkJoin, switchMap, throwError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { TalentResponse } from '../../shared/models/interfaces/talent.interface';
import { ToastrService } from 'ngx-toastr';
import { TalentDetailService } from '../services/talent-detail.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  talents: TalentResponse[] = [];
  selectedTalent!: TalentResponse;
  isFiltered: boolean = false;

  constructor(private talentService: TalentService, private toastr: ToastrService, private talentDetailService: TalentDetailService) {
    this.talentService.getTalent().subscribe((talents: TalentResponse[]) => {
      const filterTalentResponses = talents.map(talent => ({ talentId: talent.id }));
      this.talentDetailService.updateTalentList(filterTalentResponses);
      this.isFiltered = false;
    });
  }

  ngAfterViewInit(): void {
    initDropdowns();
    initModals();
  }

  ngOnInit(): void {
    this.talentDetailService.talentList$.pipe(
      switchMap((filterTalentResponse) => {
        const talentObservables = filterTalentResponse.map(filterTalentResponse =>
          this.talentService.getTalentById(filterTalentResponse.talentId)
        );
        return forkJoin(talentObservables);
      }),
      catchError((error) => {
        this.toastr.error('Error al obtener los talentos', 'Error');
        return throwError(() => error);
      })
    ).subscribe((talents) => {
      // Añade el prefijo a cada imagen
      talents.forEach(talent => {
        if (talent.image) {
          let imagePrefix = 'data:image/jpeg;base64,';
          if (talent.image.startsWith('iVBOR')) {
            imagePrefix = 'data:image/png;base64,';
          } else if (talent.image.startsWith('UklGR')) {
            imagePrefix = 'data:image/webp;base64,';
          }
          talent.image = imagePrefix + talent.image;
        }
        if (talent.filesList) {
          let filePrefix = 'data:application/pdf;base64,';
          talent.filesList.forEach(file => {
            file.file = filePrefix + file.file;
          });
        }
      });

      // this.talents = talents.reverse().slice(0, 5);
      this.talents = this.isFiltered ? talents.reverse() : talents.reverse().slice(0, 5);
      // this.toastr.success('Talentos obtenidos correctamente', 'Éxito');
      if (this.talents.length > 0) {
        this.selectedTalent = this.talents[0]; // Selecciona el primer talento
        this.onTalentClick(this.talents[0]);
      }
    });
  }

  onSearchPerformed() {
    this.isFiltered = true;
    console.log('Evento searchPerformed recibido, isFiltered establecido:' + this.isFiltered);
  }

  modalTitle: string = '';
  modalDescription: string = '';

  setModalData(title: string, description: string) {
    this.modalTitle = title;
    this.modalDescription = description;
  }

  onTalentClick(talent: TalentResponse) {
    this.selectedTalent = talent; // Actualiza el talento seleccionado cuando se hace clic en un talento
    this.talentDetailService.changeTalent(talent);
  }


}
