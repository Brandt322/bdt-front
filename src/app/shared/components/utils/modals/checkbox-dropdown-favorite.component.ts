import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/auth/services/user.service';
import { ListUser, ListUserTalent, UserListRequest, UserPrincipal } from 'src/app/shared/models/interfaces/user.interface';
import { SharedDataService } from '../../services/shared-data-service.service';
@Component({
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(100))
    ])
  ],
  selector: 'app-checkbox-dropdown-favorite',
  template: `
    <div
      [id]="modalId"
      class="z-20 hidden w-80 bg-white divide-y divide-gray-100 rounded-lg shadow"
    >
      <form [formGroup]="favoriteForm" (ngSubmit)="onSubmit()">
      <ul
        class="text-sm text-gray-700 dark:text-gray-200"
        [attr.aria-labelledby]="labelledby"
      >
        <input
          type="text"
          id="search-navbar"
          class="block w-full text-start lg:max-w-full p-2 text-lg text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Selecciona o crea un nuevo talento"
          formControlName="listName"
        />
        <li
          class="hover:bg-gray-50 cursor-pointer"
          (click)="handleChecked(i)"
          *ngFor="let item of data; let i = index"
        >
          <div
            class="flex items-center justify-between p-3"
            [ngClass]="{ 'bg-gray-200': selectedIndex === i }"
            [id]="item.id"
          >
            <span
              class="text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{
                item.name.charAt(0).toUpperCase() +
                  item.name.slice(1).toLowerCase()
              }}</span
            >
            <i
              class="fa-solid fa-check text-blue-500"
              *ngIf="selectedIndex === i"
            ></i>
          </div>
        </li>
        <button
        *ngIf="favoriteForm.controls['listName'].value"
        [@fadeInOut]
          type="submit"
          class="text-md w-full mt-2 font-medium text-white bg-[#009688] hover:bg-[#203634] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Agregar nuevo favorito
        </button>
      </ul>
      </form>
    </div>
  `,
})
export class CheckboxDropdownFavoriteComponent implements OnInit {
  @Input() modalId!: string;
  @Input() labelledby!: string;
  @Input() data?: ListUserTalent[];
  @Input() labelKey!: string;
  @Input() userDetails!: UserPrincipal;
  @Output() optionSelected = new EventEmitter<number | null>();

  selectedIndex: number | null = null;
  favoriteForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private eRef: ElementRef, private toast: ToastrService, private sharedService: SharedDataService) { }

  ngOnInit(): void {
    this.formBuild()
    this.getListFavorite();
    // console.log(localStorage.getItem('selectedTalentId'))
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clearForm();
    }
  }

  clearForm() {
    this.favoriteForm.reset();
  }

  formBuild() {
    this.favoriteForm = this.fb.group({
      listName: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.favoriteForm.valid) {
      this.addFavorite(this.favoriteForm.value.listName);
      console.log(this.favoriteForm.value)
      this.toast.success('Favorito agregado correctamente');
      this.clearForm();
    }
  }

  getListFavorite() {
    this.userService.getListsByUserId(this.userDetails.id).subscribe(response => {
      this.data = response.lists;
      this.sharedService.updateFavoriteList(this.data ?? []);
    }, error => {
      console.log(error);
    });
  }

  addFavorite(favoriteName: string) {
    const userListRequest: UserListRequest = {
      userId: this.userDetails.id,
      listName: favoriteName
    };

    this.userService.addList(userListRequest).subscribe(response => {
      this.getListFavorite();
      console.log(response);

    }, error => {
      console.log(error);
      // Handle error here
    });

  }

  handleChecked(index: number) {
    if (this.selectedIndex === index) {
      // Si el índice seleccionado es el mismo que el índice actual, deselecciona el elemento
      this.selectedIndex = null;
      this.optionSelected.emit(null);
    } else {
      // De lo contrario, selecciona el elemento
      this.selectedIndex = index; // Actualiza el índice del elemento seleccionado
      this.optionSelected.emit(index);
    }
  }
}

