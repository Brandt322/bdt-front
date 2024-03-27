import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/auth/services/user.service';
import { ListUserTalent, UserListRequest, UserPrincipal, UserTalentListRequest } from 'src/app/shared/models/interfaces/user.interface';
import { SharedDataService } from '../../services/shared-data-service.service';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { TalentService } from 'src/app/services/talent/talent.service';
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
  currentTalentId!: number;
  talentIdInList!: number | null;


  constructor(
    private fb: FormBuilder,
    private talentDetailService: TalentDetailService,
    private userService: UserService,
    private eRef: ElementRef,
    private toast: ToastrService,
    private sharedService: SharedDataService,
    private cd: ChangeDetectorRef,
    private talentService: TalentService
  ) { }

  ngOnInit(): void {
    this.formBuild()
    this.getListFavorite();
    this.currentTalentId = Number(localStorage.getItem('selectedTalentId'));

    this.talentDetailService.currentTalent.subscribe(talent => {
      this.talentIdInList = null;
      if (talent) {
        this.currentTalentId = talent.id;
        talent.lists.find(list => {
          if (talent.id === this.currentTalentId) {
            this.talentIdInList = list.idInList;
          }
        });
        // console.log(this.talentIdInList)
        this.getListFavorite();
      }
    });
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
      // console.log(this.favoriteForm.value)
      // this.toast.success('Favorito agregado correctamente');
      this.clearForm();
    }
  }

  getListFavorite() {
    this.userService.getListsByUserId(this.userDetails.id).subscribe(response => {
      this.data = response.lists;
      this.sharedService.updateFavoriteList(this.data ?? []);
      this.checkCurrentTalentInFavorites();
    }, error => {
      console.log(error);
    });
  }

  checkCurrentTalentInFavorites() {
    if (this.data) {
      const foundIndex = this.data.findIndex(favorite => favorite.talentIds && favorite.talentIds.includes(this.currentTalentId));
      this.selectedIndex = foundIndex !== -1 ? foundIndex : null;
    }
  }

  handleChecked(index: number) {
    if (this.selectedIndex !== index && this.data && this.data[index]) {
      // Crea un nuevo objeto UserTalentListRequest con la información del elemento seleccionado
      // const userListRequest: UserTalentListRequest = {
      //   listId: this.data[index].id,
      //   talentId: this.currentTalentId,
      // };
      let userListRequest: UserTalentListRequest;

      if (this.selectedIndex === null) {
        // Primera vez seleccionando un elemento
        userListRequest = {
          id: null,
          listId: this.data[index].id,
          talentId: this.currentTalentId,
        };
      } else {
        // No es la primera vez seleccionando un elemento
        userListRequest = {
          id: this.talentIdInList,
          listId: this.data[index].id,
          talentId: this.currentTalentId,
        };
      }
      // console.log(userListRequest.talentId)
      // Llama al método addListTalent() de UserService
      this.userService.addListTalent(userListRequest).subscribe(response => {
        // console.log(response);
        this.talentDetailService.updateCurrentTalent(this.currentTalentId);
        // Si el índice seleccionado no es el mismo que el índice actual, selecciona el elemento
        this.selectedIndex = index; // Actualiza el índice del elemento seleccionado
        this.optionSelected.emit(index);
        // Maneja el estado de los corazones
        this.getListFavorite()
        // this.cd.detectChanges();
        this.toast.success('Se agrego el talento a un favorito correctamente');
      }, error => {
        console.log(error);
        // Maneja el error aquí
        this.toast.error('Error al seleccionar un favorito para este talento, intente nuevamente');
      });
    }
  }

  //Metodo que agrega un favorito a la lista de favoritos
  addFavorite(favoriteName: string) {
    const userListRequest: UserListRequest = {
      userId: this.userDetails.id,
      listName: favoriteName
    };

    this.userService.addList(userListRequest).subscribe(response => {
      this.toast.success('Se agrego una sección de favorito correctamente');
      this.getListFavorite();
      console.log(response);

    }, error => {
      console.log(error);
      // Handle error here
      this.toast.error('Error al agregar favorito, intente nuevamente');
    });

  }
}

