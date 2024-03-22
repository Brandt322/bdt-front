import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { SharedDataService } from "../../../services/shared-data-service.service";
import { TalentResponse } from "src/app/shared/models/interfaces/talent.interface";
import { UserPrincipal, UserResponse } from "src/app/shared/models/interfaces/user.interface";
import { initModals } from "flowbite";
import { ICarouselItem } from "../../carousel/ICarousel-metadata";
import { UserService } from "src/app/auth/services/user.service";

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

  constructor(private data: SharedDataService, private cd: ChangeDetectorRef, private userService: UserService) { }


  ngOnInit(): void {
    if (sessionStorage.getItem('user_data')) {
      const userData = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data') || '{}') : {};
      this.userDetails = userData.userPrincipal;
    }
    this.checkIfFavorite();
    // console.log('Roles: ', this.userDetails)
    // console.log('Roles: ', this.talentFileList)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['talentId'] && !changes['talentId'].firstChange) {
      this.checkIfFavorite();
    }
    if (changes['talent'] && !changes['talent'].firstChange) {
      this.checkIfFavorite();
    }
  }

  // checkIfFavorite(): void {
  //   console.log(this.talentId)
  //   this.userService.getListsByUserId(this.userDetails.id).subscribe(response => {
  //     const favoriteLists = response.lists;
  //     this.isFavorite = favoriteLists.some(list => list.talentIds.includes(this.talentId));
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  checkIfFavorite(): void {
    if (this.userDetails && this.talentId !== undefined) {
      this.userService.getListsByUserId(this.userDetails.id).subscribe(response => {
        const favoriteLists = response.lists;
        this.isFavorite = favoriteLists.some(list => list.talentIds.includes(this.talentId));
      }, error => {
        console.log(error);
      });
    }
  }

  feedbackMessage(): string {
    let feedbackNumber = this.feedbackNumber ?? 0;
    if (feedbackNumber > 1) {
      return `${feedbackNumber} Feedbacks`;
    } else {
      return `${feedbackNumber} Feedback`;
    }
  }

  openModalSocial() {
    this.data.changeGithubLink(this.githubLink);
    this.data.changeLinkedinLink(this.linkedinLink);
  }

  openModalMont() {
    this.data.changeInitialMont(this.initialMont);
    this.data.changeFinalMont(this.finalMont);
    this.data.changeCurrency(this.currencyId || 0)
  }
}
