import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  @Input() maxRating: number = 5;
  @Input() currentRating: number = 0;
  @Input() readonly: boolean = false;
  @Output() ratingChangeEmitter = new EventEmitter<number>();
  private ratingChange: any;
  ratingArray: any[] = [];
  selectedStar: number = 0;
  previousSelection: number = 0;

  ngOnInit(): void {
    this.ratingArray = Array(this.maxRating).fill(0);
    this.selectedStar = this.currentRating; // Inicializamos selectedStar con currentRating
  }

  handleMouseEnter(index: number) {
    if (this.readonly) {
      return; // Si readonly es true, no hagas nada
    }
    this.selectedStar = index + 1;
  }

  handleMouseLeave() {
    if (this.readonly) {
      return; // Si readonly es true, no hagas nada
    }
    if (this.previousSelection !== 0) {
      this.selectedStar = this.previousSelection;
    } else {
      this.selectedStar = 0;
    }
  }

  handleClickRating(index: number) {
    if (this.readonly) {
      return; // Si readonly es true, no hagas nada
    }

    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar;
    this.ratingChangeEmitter.emit(this.selectedStar); // Emitir evento para los componentes padre
    if (this.ratingChange) {
      this.ratingChange(this.selectedStar); // Notificar a Angular que el valor ha cambiado
    }
  }

  onRatingChange(rating: number) {
    console.log('Rating changed: ', rating);
  }

  // Métodos para ControlValueAccessor
  writeValue(obj: any): void {
    // Actualiza la vista con el nuevo valor
    this.selectedStar = obj;
  }

  registerOnChange(fn: any): void {
    // Registra la función a llamar cuando el valor cambia
    this.ratingChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Registra la función a llamar cuando el control es tocado
  }

  setDisabledState?(isDisabled: boolean): void {
    // Deshabilita o habilita el control
  }
}
