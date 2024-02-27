import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { catchError, throwError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { FakeProfiles } from 'src/app/shared/models/types';
import { TalentResponse } from '../../shared/models/interfaces/talent.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  profiles = FakeProfiles;
  talents: TalentResponse[] = [];

  constructor(private talentService: TalentService, private toastr: ToastrService) { }

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
        this.talents = talents.slice(talents.length - 6, talents.length - 1);
        this.toastr.success('Talentos obtenidos correctamente', 'Éxito');
      });
  }

  modalTitle: string = '';
  modalDescription: string = '';

  setModalData(title: string, description: string) {
    this.modalTitle = title;
    this.modalDescription = description;
  }
}
