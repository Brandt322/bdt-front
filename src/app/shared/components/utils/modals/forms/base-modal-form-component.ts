import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-modal-form',
  template: `<div
    [id]="id"
    tabindex="-1"
    aria-hidden="true"
    data-modal-backdrop="static"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative px-4 pt-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="px-4 pb-6">
          <!-- Modal header -->
          <div
            class="block items-center p-4 md:p-5 rounded-t dark:border-gray-600"
          >
            <h3
              class="block text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ title }}
            </h3>
            <p class="block text-gray-500 text-sm md:text-base">
              {{ description }}
            </p>
          </div>
          <!-- Modal body -->
          <div class="px-4 md:px-5">
            <ng-content></ng-content>
          </div>
        </div>
        <!-- [attr.data-modal-hide]="id" -->
      </div>
    </div>
  </div>`,
})
export class BaseModalFormComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
}
