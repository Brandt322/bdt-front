import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { MainComponent } from './components/layout/main/main.component';
import { AppRoutingModule } from '../app-routing.module';
import { RadioModalComponent } from './components/utils/modals/radio-modal.component';
import { CheckboxModalComponent } from './components/utils/modals/checkbox-modal.component';
import { ButtonDropdownComponent } from './components/utils/buttons/button-dropdown.component';
import { ProfileComponent } from './components/utils/cards/profile/profile.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    RadioModalComponent,
    CheckboxModalComponent,
    ButtonDropdownComponent,
    ProfileComponent
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    MainComponent,
    RadioModalComponent,
    CheckboxModalComponent,
    ButtonDropdownComponent,
    ProfileComponent
  ],
})
export class SharedModule { }
