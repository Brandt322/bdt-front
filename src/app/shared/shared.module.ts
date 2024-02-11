import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { MainComponent } from './components/layout/main/main.component';
import { ButtonDropdownComponent } from './components/utils/buttons/button-dropdown.component';
import { ProfileComponent } from './components/utils/cards/profile/profile.component';
import { AddSkillButtonComponent } from './components/utils/form-inputs/add-skill-component';
import { CheckboxInputComponent } from './components/utils/form-inputs/checkbox-input-component';
import { FileInputComponent } from './components/utils/form-inputs/file-input-component';
import { SubtitleFormComponent } from './components/utils/form-inputs/subtitle-form-component';
import { TextInputComponent } from './components/utils/form-inputs/text-input-component';
import { CheckboxModalComponent } from './components/utils/modals/checkbox-modal.component';
import { RadioModalComponent } from './components/utils/modals/radio-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    RadioModalComponent,
    CheckboxModalComponent,
    ButtonDropdownComponent,
    ProfileComponent,
    /* Input */
    CheckboxInputComponent,
    TextInputComponent,
    SubtitleFormComponent,
    FileInputComponent,
    AddSkillButtonComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    MainComponent,
    RadioModalComponent,
    CheckboxModalComponent,
    ButtonDropdownComponent,
    ProfileComponent,
    /* Form Inputs */
    CheckboxInputComponent,
    TextInputComponent,
    SubtitleFormComponent,
    FileInputComponent,
    AddSkillButtonComponent,
  ],
})
export class SharedModule {}
