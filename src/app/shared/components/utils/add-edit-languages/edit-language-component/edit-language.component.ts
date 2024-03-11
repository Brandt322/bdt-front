import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
})
export class EditLanguageComponent {
  @Input() modal_id!: string;
  languages: { value: number; label: string }[] = [
    {
      value: 1,
      label: 'Español',
    },
    {
      value: 2,
      label: 'Inglés',
    },
    {
      value: 3,
      label: 'Francés',
    },
  ];
  levels: { value: number; label: string }[] = [
    {
      value: 1,
      label: 'Básico',
    },
    {
      value: 2,
      label: 'Intermedio',
    },
    {
      value: 3,
      label: 'Avanzado',
    },
    {
      value: 4,
      label: 'Nativo',
    },
  ];
  @Input() data: {
    languageId: number;
    levelId: number;
    numberOfStars: number;
  } = {
    languageId: 0,
    levelId: 0,
    numberOfStars: 0,
  };
}
