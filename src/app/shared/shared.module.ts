import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { MainComponent } from './components/layout/main/main.component';
import { AddEditAttrComponent } from './components/utils/add-edit-attr/add-edit-attr.component';
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
import { CheckboxDropdownMultipleSelectModalComponent } from './components/utils/modals/checkbox-dropdown-multiple-select/checkbox-dropdown-multiple-select-modal.component';
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
import { CheckboxDropdownSelectDataModalComponent } from './components/utils/modals/checkbox-dropdown-select-modal.component';
import { PillTagComponent } from './components/utils/tags/pill-tag/pill-tag-component';
import { CheckboxDropdownSelectPrevModalComponent } from './components/utils/modals/checkbox-droddown-prev-modal.component';
import { NavFiltersComponent } from './components/layout/nav-filters/nav-filters.component';
import { TalentContentComponent } from './components/layout/talent-content/talent-content.component';
import { SelectInputComponent } from './components/utils/form-inputs/select-input-component';
import { RadioInputComponent } from './components/utils/form-inputs/radio-input-component';
import { AddEditLanguagesComponent } from './components/utils/add-edit-languages/add-edit-languages.component';
import { AddEditFeedbackComponent } from './components/utils/add-edit-feedback/add-edit-feedback.component';
import { FeedbackModalFormComponent } from './components/utils/modals/forms/feedback-form-component';
import { TextAreaInputComponent } from './components/utils/form-inputs/textarea-input.componen';
import { RatingComponent } from './components/utils/rating/rating.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    RadioModalComponent,
    CheckboxModalComponent,
    ButtonDropdownComponent,
    ProfileComponent,
    AddEditAttrComponent,
    AddEditLanguagesComponent,
    AddEditFeedbackComponent,
    /* Input */
    CheckboxInputComponent,
    TextInputComponent,
    SubtitleFormComponent,
    FileInputComponent,
    AddSkillButtonComponent,
    DateInputComponent,
    LanguageSelectComponent,
    LanguageLevelSelectComponent,
    SelectInputComponent,
    RadioInputComponent,
    TextAreaInputComponent,
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
    CheckboxDropdownSelectDataModalComponent,
    PillTagComponent,
    CheckboxDropdownSelectPrevModalComponent,
    NavFiltersComponent,
    TalentContentComponent,
    FeedbackModalFormComponent,
    RatingComponent

  ],
  imports: [CommonModule, AppRoutingModule, FormsModule],
  exports: [
    HeaderComponent,
    MainComponent,
    RadioModalComponent,
    CheckboxModalComponent,
    ButtonDropdownComponent,
    ProfileComponent,
    AddEditAttrComponent,
    NavFiltersComponent,
    TalentContentComponent,
    AddEditLanguagesComponent,
    AddEditFeedbackComponent,
    RatingComponent,
    /* Form Inputs */
    CheckboxInputComponent,
    TextInputComponent,
    SubtitleFormComponent,
    FileInputComponent,
    AddSkillButtonComponent,
    SelectInputComponent,
    RadioInputComponent,
    TextAreaInputComponent,
    /* Modal forms */
    ModalFormsCollection,
    ExperienceModalFormComponent,
    EducationModalFormComponent,
    LanguageModalFormComponent,
    FeedbackModalFormComponent,
    /* Dropdown modals */
    CheckboxDropdownSelectPrevModalComponent,
    CheckboxDropdownMultipleSelectModalComponent,
    CheckboxDropdownSelectDataModalComponent,
    /* Tags */
    PillTagComponent,
  ],
})
export class SharedModule { }
