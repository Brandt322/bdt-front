import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-checkbox-dropdown-modal',
  templateUrl: './checkbox-dropdown-modal.component.html',
})

export class CheckboxDropdownModalComponent implements OnInit {
  @Input() modalId!: string;
  @Input() labelledby!: string;
  @Input() skills!: { id: string; name: string }[];

  isChecked: boolean[] = [];

  ngOnInit() {
    // Inicializa el array isChecked con el mismo número de elementos que skills, todos en false
    this.isChecked = Array(this.skills.length).fill(false);
  }

  handleChecked(index: number) {
    this.isChecked[index] = !this.isChecked[index]; // Cambia el valor de isChecked para el elemento específico
  }
}
