import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-checkbox-dropdown-modal',
  templateUrl: './checkbox-dropdown-multiple-select-modal.component.html',
})

export class CheckboxDropdownMultipleSelectModalComponent implements OnInit {
  @Input() modalId!: string;
  @Input() labelledby!: string;
  @Input() skills!: string[];
  @Output() selectedSkillsChange = new EventEmitter<string[]>();

  isChecked: boolean[] = [];
  selectedSkills: string[] = []; // propiedad para los elementos seleccionados

  ngOnInit() {
    // Inicializa el array isChecked con el mismo número de elementos que skills, todos en false
    this.isChecked = Array(this.skills.length).fill(false);
  }

  handleChecked(index: number) {
    this.isChecked[index] = !this.isChecked[index]; // Cambia el valor de isChecked para el elemento específico

    // Si el elemento está seleccionado, lo agrega a selectedSkills, de lo contrario lo elimina
    if (this.isChecked[index]) {
      this.selectedSkills.push(this.skills[index]);
    } else {
      this.selectedSkills = this.selectedSkills.filter(skill => skill !== this.skills[index]);
    }

    this.selectedSkillsChange.emit(this.selectedSkills);
  }

  handleCancel(skill: string) {
    // Encuentra el índice del elemento en skills
    const index = this.skills.findIndex(s => s === skill);

    // Actualiza el estado de isChecked para ese elemento
    this.isChecked[index] = false;

    // Elimina el elemento de selectedSkills
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);

    this.selectedSkillsChange.emit(this.selectedSkills);
  }
}
