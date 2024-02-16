import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Language from '../../../shared/models/interfaces/language.interface';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { LoaderService } from 'src/app/core/global/loader/loader.service';
import { catchError, forkJoin, throwError } from 'rxjs';
import { MasterService } from '../../../services/master/master.service';
import { MASTER_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { finalize } from 'rxjs/operators';
import { Coin } from 'src/app/shared/models/interfaces/coin.interface';

@Component({
  selector: 'app-talent-create',
  templateUrl: './talent-create.component.html',
  styleUrls: ['./talent-create.component.css'],
})
export class TalentCreateComponent implements OnInit {
  @Input() maxRatting: number = 5;
  @Input() SelectedStar: number = 0;

  languageOptions: Language[] = [];
  levelOptions: Level[] = [];
  coinOptions: Coin[] = [];
  maxRattingArr: any = [];
  previousSelection: number = 0;

  constructor(private router: Router, public loader: LoaderService, private masterService: MasterService) { }

  ngOnInit(): void {
    this.maxRattingArr = Array(this.maxRatting).fill(0);
    this.requestOptions();
  }

  requestOptions() {
    this.loader.showLoader();

    const languageRequest = this.masterService.getLanguage(MASTER_API_ENDPOINTS.LANGUAGES);
    const levelRequest = this.masterService.getLevel(MASTER_API_ENDPOINTS.LEVELS);
    const coinRequest = this.masterService.getCoin(MASTER_API_ENDPOINTS.COINS);

    forkJoin([languageRequest, levelRequest, coinRequest]).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
      finalize(() => this.loader.hideLoader())
    ).subscribe(([languages, levels, coins]) => {
      this.languageOptions = languages;
      this.levelOptions = levels;
      this.coinOptions = coins;
    });
  }

  HandleMouseEnter(index: number) {
    this.SelectedStar = index + 1;
  }

  HandleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection;
    } else {
      this.SelectedStar = 0;
    }
  }
  HandleClickRating(index: number) {
    this.SelectedStar = index + 1;
    this.previousSelection = this.SelectedStar;
  }

  onButtonClick() {
    this.router.navigate(['/main']);
  }
}
