import { Component, Input } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data-service.service';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../Validations/CustomValidators';

@Component({
  selector: 'app-salary-band-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Agrega la banda salarial"
    description="Agrega el rango de tus espectativas salariales."
  >
    <form [formGroup]="salaryBandForm" (ngSubmit)="update()">
      <div class="grid gap-4 mb-8">
        <div
          class="flex items-center ps-4 border rounded-lg border-gray-200 dark:border-gray-700 space-y-reverse"
        >
          <input
            id="bordered-radio-1"
            type="radio"
            value="1"
            formControlName="currencyId"
            name="currencyId"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-radio-1"
            class="w-full py-4 ms-2 text-sm text-gray-900 dark:text-gray-300"
            >Soles</label
          >
        </div>
        <div
          class="flex items-center ps-4 border rounded-lg border-gray-200 dark:border-gray-700"
        >
          <input
            id="bordered-radio-2"
            type="radio"
            value="2"
            formControlName="currencyId"
            name="currencyId"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-radio-2"
            class="w-full py-4 ms-2 text-sm text-gray-900 dark:text-gray-300"
            >Dólares</label
          >
        </div>
        <span
          class="font-medium text-red-500 leading-tight"
          *ngIf="
            salaryBandForm.controls['currencyId'].invalid &&
            salaryBandForm.controls['currencyId'].touched
          "
        >
          Este campo es obligatorio.
        </span>
        <div class="grid gap-4 md:grid-cols-2">
          <app-text-input
            [id]="'monto-inicial'"
            [value]="initialAmount.toString()"
            formControlName="initialAmount"
            label="Monto inicial"
            placeholder="Ingrese el monto inicial"
          >
          </app-text-input>

          <app-text-input
            [id]="'monto-final'"
            [value]="finalAmount.toString()"
            formControlName="finalAmount"
            label="Monto final"
            placeholder="Ingrese el monto final"
          >
          </app-text-input>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="
              salaryBandForm.controls['initialAmount'].invalid &&
              salaryBandForm.controls['initialAmount'].touched
            "
          >
            El monto inicial es obligatorio.
          </span>
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="
              salaryBandForm.controls['finalAmount'].invalid &&
              salaryBandForm.controls['finalAmount'].touched
            "
          >
            El monto final es obligatorio.
          </span>
        </div>
        <div
          class="grid gap-2 leading-tight"
          *ngIf="
            (salaryBandForm.get('initialAmount')?.touched &&
              salaryBandForm.get('initialAmount')?.errors) ||
            (salaryBandForm.get('finalAmount')?.touched &&
              salaryBandForm.get('finalAmount')?.errors)
          "
        >
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="salaryBandForm.get('initialAmount')?.errors?.['minValue'] || salaryBandForm.get('finalAmount')?.errors?.['minValue']"
          >
            El minimo valor es de 500.
          </span>
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="salaryBandForm.get('initialAmount')?.errors?.['maxValue'] || salaryBandForm.get('finalAmount')?.errors?.['maxValue']"
          >
            El campo de grado debe tener al menos 3 caracteres.
          </span>
          <span
            class="font-medium text-orange-500 leading-tight"
            *ngIf="salaryBandForm.get('initialAmount')?.errors?.['numericType'] || salaryBandForm.get('finalAmount')?.errors?.['numericType']"
          >
            Solo puedes ingresar numeros
          </span>
        </div>
        <div class="grid gap-2 leading-tight" *ngIf="salaryBandForm.errors">
          <span
            class="font-medium text-orange-500 leading-tight"
            *ngIf="salaryBandForm.errors['amountGreaterThan']"
          >
            El monto inicial no debe ser mayor que el monto final.
          </span>
        </div>
      </div>
      <app-cancel-save-buttons
        [form]="salaryBandForm"
        [modal_id]="modal_id"
        [save_button_id]="'btn-salary-band'"
        (cancelClicked)="salaryBandForm.reset()"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class SalaryBandModalForm {
  modal_id: string = 'salary-band-modal';
  @Input() id!: string;
  @Input() title!: string;
  initialAmount!: number;
  finalAmount!: number;
  currency!: string;
  currencyId!: number;
  salaryBandForm!: FormGroup;

  constructor(
    private data: SharedDataService,
    private formBuilder: FormBuilder,
    private talentDetailService: TalentDetailService
  ) { }

  ngOnInit() {
    // Inicializa el formulario con valores vacíos
    this.buildForm();

    // Actualiza los valores del formulario cuando los datos cambian
    this.data.currentInitialMont.subscribe((mont) => {
      this.initialAmount = mont;
      this.salaryBandForm.get('initialAmount')?.setValue(this.initialAmount);
    });
    this.data.currentFinalMont.subscribe((mont) => {
      this.finalAmount = mont;
      this.salaryBandForm.get('finalAmount')?.setValue(this.finalAmount);
    });
    this.data.currentCurrency.subscribe((currency) => {
      this.currencyId = currency;
      this.salaryBandForm
        .get('currencyId')
        ?.setValue(this.currencyId.toString());
    });
  }

  buildForm() {
    this.salaryBandForm = this.formBuilder.group(
      {
        initialAmount: [
          0,
          [
            Validators.required,
            CustomValidators.minValue(500),
            CustomValidators.maxValue(100000),
            CustomValidators.numericType()
          ],
        ],
        finalAmount: [
          0,
          [
            Validators.required,
            CustomValidators.minValue(500),
            CustomValidators.maxValue(100000),
            CustomValidators.numericType()
          ],
        ],
        currencyId: [0, Validators.required],
      },
      {
        validator: CustomValidators.amountGreaterThan(
          'initialAmount',
          'finalAmount'
        ),
      }
    );
  }

  update() {
    if (this.salaryBandForm.valid) {
      let { initialAmount, finalAmount, currencyId } =
        this.salaryBandForm.value;

      this.talentDetailService.updateSalaryBandForCurrentTalent({
        initialAmount,
        finalAmount,
        currencyId,
      });
      this.salaryBandForm.reset();
    }
  }
}
