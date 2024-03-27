import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-input',
  template: `
    <div

        class="flex items-center justify-center w-full mb-2">
      <label
        [for]="id"
        [ngClass]="{' border-red-500': hasError}"
        class="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6" *ngIf="!fileSelected">
          <svg
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <span class="font-semibold text-cyan-600">{{ title }}</span>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ description }}
          </p>
        </div>
        <input
          [id]="id"
          type="file"
          [ngClass]="{' hidden': !fileSelected, 'block': fileSelected}"
          [accept]="accept"
          ngDefaultControl
          (change)="onFileChange($event)"
          (blur)="onTouched()"
        />
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
})
export class FileInputComponent implements OnInit, ControlValueAccessor {
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() accept!: string;
  @Input() hasError!: boolean;
  @Input() modalClosed?: Observable<void>;
  value!: File;
  fileSelected: boolean = false;

  onTouched: any = () => { };
  onChange: any = () => { };

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onFileChange(event: any): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files && files.length > 0) {
      this.value = files[0];
      this.onChange(this.value);
      this.fileSelected = true;
    }
  }

  ngOnInit(): void {
    this.modalClosed?.subscribe(() => {
      this.fileSelected = false; // Reiniciar fileSelected cuando se emite modalClosed
    });
  }
}
