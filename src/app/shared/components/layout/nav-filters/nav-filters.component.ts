import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, forkJoin, throwError } from 'rxjs';
import { MASTER_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { LoaderService } from 'src/app/core/global/loader/loader.service';
import { MasterService } from 'src/app/services/master/master.service';
import { Level } from 'src/app/shared/models/interfaces/level-interface';

@Component({
  selector: 'app-nav-filters',
  templateUrl: './nav-filters.component.html',
  styleUrls: ['./nav-filters.component.css'],
})
export class NavFiltersComponent implements OnInit {
  isOpen: boolean = false;
  levels: Level[] = [];
  skills: string[] = [];
  constructor(private router: Router, private masterService: MasterService, private toastr: ToastrService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.requestOptions();
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


    forkJoin([
      skillRequest,
      levelRequest,
    ])
      .pipe(
        catchError((error) => {
          this.toastr.error('Error al obtener los niveles', 'Error');
          return throwError(() => error);
        }),
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(([skills, levels]) => {
        this.skills = skills;
        this.levels = levels;
        this.toastr.success('Niveles obtenidos correctamente', 'Éxito');
      });
  }
}
