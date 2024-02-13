import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-pill-tag-component',
  templateUrl: './pill-tag-component.html',
})

export class PillTagComponent {
  @Input() data: { id: string; skill: string; years?: number }[] = [];
  @Input() variant!: string;
}
