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

  constructor(private talentService: TalentService) {}

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
        this.talents = talents;
      });
  }

  modalTitle: string = '';
  modalDescription: string = '';

  setModalData(title: string, description: string) {
    this.modalTitle = title;
    this.modalDescription = description;
  }
}
