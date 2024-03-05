import { Component, Input, OnInit } from "@angular/core";
import { SharedDataService } from "../../../services/shared-data-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  @Input() variant!: string;
  @Input() name!: string;
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

  constructor(private data: SharedDataService) { }

  ngOnInit(): void {

  }

  openModalSocial() {
    this.data.changeGithubLink(this.githubLink);
    this.data.changeLinkedinLink(this.linkedinLink);
  }

  openModalMont() {
    this.data.changeInitialMont(this.initialMont);
    this.data.changeFinalMont(this.finalMont);
    this.data.changeCurrency(this.currency || '')
  }
}
