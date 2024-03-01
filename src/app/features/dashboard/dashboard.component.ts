import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { catchError, throwError } from 'rxjs';
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

  constructor(private talentService: TalentService, private toastr: ToastrService, private talentDetailService: TalentDetailService) { }

  ngAfterViewInit(): void {
    initDropdowns();
    initModals();
  }

  ngOnInit(): void {
    this.talentService
      .getTalent()
      .pipe(
        catchError((error) => {
          this.toastr.error('Error al obtener los talentos', 'Error');
          return throwError(() => error);
        })
      )
      .subscribe((talents) => {

        // Añade el prefijo a cada imagen
        talents.forEach(talent => {
          let imagePrefix = 'data:image/jpeg;base64,';
          if (talent.image.startsWith('iVBOR')) {
            imagePrefix = 'data:image/png;base64,';
          } else if (talent.image.startsWith('UklGR')) {
            imagePrefix = 'data:image/webp;base64,';
          }
          talent.image = imagePrefix + talent.image;
        });

        // this.talents = talents;
        this.talents = talents.reverse().slice(0, 5);
        this.toastr.success('Talentos obtenidos correctamente', 'Éxito');
        if (this.talents.length > 0) {
          this.selectedTalent = this.talents[0]; // Selecciona el primer talento
          this.onTalentClick(this.talents[0]);
        }
      });
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
