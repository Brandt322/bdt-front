import { Component, Input } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data-service.service';

@Component({
  selector: 'app-socials-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Agrega los medios sociales"
    description="Agrega y muestra los medios sociales"
  >
    <form action="">
      <div class="grid gap-4 mb-8">
        <app-text-input
          [id]="'link-linkedin'"
          [value]="linkedinLink"
          label="Link de Linkedin"
          placeholder="Link del perfil de LinkedIn"
        >
        </app-text-input>
        <app-text-input
          [id]="'link-github'"
          [value]="githubLink"
          label="Link de GitHub"
          placeholder="Link del perfil de GitHub"
        >
        </app-text-input>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'btn-socials'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class SocialsModalFormComponent {
  modal_id: string = 'socials-modal';
  @Input() id!: string;
  @Input() title!: string;
  githubLink!: string;
  linkedinLink!: string;
  constructor(private data: SharedDataService) { }

  ngOnInit() {
    this.data.currentGithubLink.subscribe(link => this.githubLink = link);
    this.data.currentLinkedinLink.subscribe(link => this.linkedinLink = link);
  }
}
