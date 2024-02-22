import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle-form',
  template: `<h3 class="text-xl font-bold my-4">{{ text }}</h3>`,
})
export class SubtitleFormComponent {
  @Input() text!: string;
}
