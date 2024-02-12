import { Component } from '@angular/core';

@Component({
  selector: 'app-add-skill-button',
  template: ` <button class="text-start font-bold text-cyan-500">
    +
    <span class="hover:underline">Agregar más</span>
  </button>`,
})
export class AddSkillButtonComponent {}
