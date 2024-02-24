import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MASTER_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { MasterService } from 'src/app/services/master/master.service';
import { Level } from 'src/app/shared/models/interfaces/level-interface';

@Component({
  selector: 'app-nav-filters',
  templateUrl: './nav-filters.component.html',
  styleUrls: ['./nav-filters.component.css'],
})
export class NavFiltersComponent implements OnInit {
  data: Level[] = [];
  isOpen: boolean = false;
  constructor(private router: Router, private masterService: MasterService) { }

  ngOnInit(): void {
    this.masterService
      .getLevel(MASTER_API_ENDPOINTS.LEVELS)
      .subscribe((niveles) => {
        this.data = niveles;
      });
  }

  onButtonClick() {
    this.router.navigate(['/main/new-talent']);
  }

  isNavOpen() {
    this.isOpen = !this.isOpen;
  }
}
