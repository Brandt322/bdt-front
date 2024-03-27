import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { SharedDataService } from "../../../services/shared-data-service.service";
import { TalentResponse } from "src/app/shared/models/interfaces/talent.interface";
import { UserPrincipal } from "src/app/shared/models/interfaces/user.interface";

import { UserService } from "src/app/auth/services/user.service";
import { TalentDetailService } from "src/app/features/services/talent-detail.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit, OnChanges {
  @Input() variant!: string;
  @Input() name!: string;
  @Input() paternalSurname!: string;
  @Input() cellphoneNumber!: string;
  // @Input() talentFileList!: ICarouselItem[];
  @Input() image!: string;
  @Input() stack!: string;
  @Input() iconEditImg?: boolean;
  @Input() city!: string;
  @Input() country!: string;
  @Input() initialMont!: number;
  @Input() finalMont!: number;
  @Input() iconEditMont?: boolean;
  @Input() feedbackNumber?: number;
  @Input() options?: boolean;
  @Input() selected = false;
  @Input() githubLink!: string;
  @Input() linkedinLink!: string;
  @Input() currency?: string;
  @Input() currencyId?: number;
  @Input() averageRating!: number;
  @Input() readonly: boolean = false;
  @Input() talent!: TalentResponse;
  @Input() talentId!: number;
  isFavorite: boolean = false;
  userDetails!: UserPrincipal;
  favoriteTalents: number[] = [];
  constructor(private sharedService: SharedDataService, private cd: ChangeDetectorRef, private userService: UserService, private talentDetailService: TalentDetailService) { }


  ngOnInit(): void {
    if (sessionStorage.getItem('user_data')) {
      const userData = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data') || '{}') : {};
      this.userDetails = userData.userPrincipal;
    }
    this.sharedService.favoriteList$.subscribe(favoriteList => {
      this.favoriteTalents = favoriteList.map(list => list.talentIds).flat();
      this.checkIfFavorite();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['talentId'] && !changes['talentId'].firstChange) {
      this.checkIfFavorite();
    }
    if (changes['talent'] && !changes['talent'].firstChange) {
      this.checkIfFavorite();
    }
  }

  checkIfFavorite(): void {
    if (this.userDetails && this.talentId !== undefined) {
      this.isFavorite = this.favoriteTalents.includes(this.talentId);
    }
  }

  // checkIfFavorite(): void {
  //   if (this.userDetails && this.talentId !== undefined) {
  //     this.userService.getListsByUserId(this.userDetails.id).subscribe(response => {
  //       const favoriteLists = response.lists;
  //       this.isFavorite = favoriteLists.some(list => list.talentIds.includes(this.talentId));
  //       this.cd.detectChanges();
  //     }, error => {
  //       console.log(error);
  //     });
  //   }
  // }

  feedbackMessage(): string {
    let feedbackNumber = this.feedbackNumber ?? 0;
    if (feedbackNumber > 1) {
      return `${feedbackNumber} Feedbacks`;
    } else {
      return `${feedbackNumber} Feedback`;
    }
  }

  openModalSocial() {
    this.sharedService.changeGithubLink(this.githubLink);
    this.sharedService.changeLinkedinLink(this.linkedinLink);
  }

  openModalMont() {
    this.sharedService.changeInitialMont(this.initialMont);
    this.sharedService.changeFinalMont(this.finalMont);
    this.sharedService.changeCurrency(this.currencyId || 0)
  }

  // get currencyCode() {
  //   switch (this.currency) {
  //     case 'DOLAR':
  //       return 'USD';
  //     case 'SOL':
  //       return 'PEN'; // Asegúrate de que este es el código correcto para SOL
  //     default:
  //       return '';
  //   }
  // }
  getCurrencySymbol(currency: string | undefined) {
    switch (currency) {
      case 'DOLAR':
        return '$';
      case 'SOL':
        return 'S/'; // Reemplaza esto con el símbolo correcto para SOL
      default:
        return '';
    }
  }
}
