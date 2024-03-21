import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { SharedDataService } from "../../../services/shared-data-service.service";
import { TalentResponse } from "src/app/shared/models/interfaces/talent.interface";
import { UserPrincipal, UserResponse } from "src/app/shared/models/interfaces/user.interface";
import { initModals } from "flowbite";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit, OnChanges {
  @Input() variant!: string;
  @Input() name!: string;
  @Input() paternalSurname!: string;
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


  userDetails!: UserPrincipal;

  constructor(private data: SharedDataService, private cd: ChangeDetectorRef) { }


  ngOnInit(): void {
    if (sessionStorage.getItem('user_data')) {
      const userData = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data') || '{}') : {};
      this.userDetails = userData.userPrincipal;
    }

    // console.log('Roles: ', this.userDetails)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['talent']) {
      // Aquí, actualiza la vista con el talento actualizado.
      // console.log('Talent updated: ', this.talent.currency);
      this.cd.markForCheck();
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
