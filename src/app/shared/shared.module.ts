import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { MainComponent } from './components/layout/main/main.component';
import { ButtonDropdownComponent } from './components/utils/buttons/button-dropdown.component';
import { ProfileComponent } from './components/utils/cards/profile/profile.component';
import { AddSkillButtonComponent } from './components/utils/form-inputs/add-skill-component';
import { CheckboxInputComponent } from './components/utils/form-inputs/checkbox-input-component';
import { DateInputComponent } from './components/utils/form-inputs/date-input-component';
import { FileInputComponent } from './components/utils/form-inputs/file-input-component';
import {
  LanguageLevelSelectComponent,
  LanguageSelectComponent,
} from './components/utils/form-inputs/language-select-component';
import { SubtitleFormComponent } from './components/utils/form-inputs/subtitle-form-component';
import { TextInputComponent } from './components/utils/form-inputs/text-input-component';
import { CheckboxModalComponent } from './components/utils/modals/checkbox-modal.component';
import { BaseModalFormComponent } from './components/utils/modals/forms/base-modal-form-component';
import { CancelSaveButtonsComponent } from './components/utils/modals/forms/cancel-save-buttons';
import { EducationModalFormComponent } from './components/utils/modals/forms/education-form-component';
import { ExperienceModalFormComponent } from './components/utils/modals/forms/experience-form-component';
import { LanguageModalFormComponent } from './components/utils/modals/forms/language-form-component';
import { ModalFormsCollection } from './components/utils/modals/forms/modal-forms-collection';
import { NewFileModalFormComponent } from './components/utils/modals/forms/new-file-form-component';
import { NewProfilePicModalFormComponent } from './components/utils/modals/forms/new-profile-pic-form-component';
import { SalaryBandModalForm } from './components/utils/modals/forms/salary-band-form-component';
import { SocialsModalFormComponent } from './components/utils/modals/forms/socials-form-component';
import { TechnicalSkillsModalFormComponent } from './components/utils/modals/forms/technical-skills-form-component';
import { RadioModalComponent } from './components/utils/modals/radio-modal.component';
import { CheckboxDropdownMultipleSelectModalComponent } from './components/utils/modals/checkbox-dropdown-multiple-select/checkbox-dropdown-multiple-select-modal.component';
import { CheckboxDropdownSelectModalComponent } from './components/utils/modals/checkbox-dropdown-select-modal.component';
import { PillTagComponent } from './components/utils/tags/pill-tag/pill-tag-component';

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
    DateInputComponent,
    LanguageSelectComponent,
    LanguageLevelSelectComponent,
    /* Modal forms */
    BaseModalFormComponent,
    ModalFormsCollection,
    CancelSaveButtonsComponent,
    NewProfilePicModalFormComponent,
    SalaryBandModalForm,
    SocialsModalFormComponent,
    TechnicalSkillsModalFormComponent,
    NewFileModalFormComponent,
    ExperienceModalFormComponent,
    EducationModalFormComponent,
    LanguageModalFormComponent,
    CheckboxDropdownMultipleSelectModalComponent,
    CheckboxDropdownSelectModalComponent,
    PillTagComponent
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
    /* Modal forms */
    ModalFormsCollection,
    ExperienceModalFormComponent,
    EducationModalFormComponent,
    LanguageModalFormComponent,
    /* Dropdown modals */
    CheckboxDropdownMultipleSelectModalComponent,
    CheckboxDropdownSelectModalComponent,
    /* Tags */
    PillTagComponent
  ],
})
export class SharedModule { }
