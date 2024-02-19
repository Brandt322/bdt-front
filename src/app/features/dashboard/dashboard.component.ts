import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initDropdowns, initModals } from 'flowbite';
import { catchError, throwError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { FakeProfiles } from 'src/app/shared/models/types';
import { Talent } from '../../shared/models/interfaces/talent.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  profiles = FakeProfiles;
  talents: Talent[] = [];

  constructor(private talentService: TalentService) { }

  ngAfterViewInit(): void {
    initDropdowns();
    initModals();
  }

  ngOnInit(): void {
    this.talentService
      .getTalent()
      .pipe(
        catchError((error) => {
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
        this.talents = talents.slice(0, 5);
      });
  }

  modalTitle: string = '';
  modalDescription: string = '';

  setModalData(title: string, description: string) {
    this.modalTitle = title;
    this.modalDescription = description;
  }
}
