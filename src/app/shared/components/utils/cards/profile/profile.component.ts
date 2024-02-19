import { Component, Input, OnInit } from "@angular/core";

interface Image {
  url: string;
  alt: string;
  width: number,
  height: number,
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  @Input() variant!: string;
  @Input() name!: string;
  @Input() image!: string;
  @Input() stack!: string;
  @Input() iconEditImg?: boolean;
  @Input() location!: string;
  @Input() initialMont!: number;
  @Input() finalMont!: number;
  @Input() iconEditMont?: boolean;
  @Input() feedbackNumber?: number;
  @Input() options?: boolean;

  constructor() { }

  ngOnInit(): void {

  }

}
