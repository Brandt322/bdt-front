import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { MainComponent } from './components/layout/main/main.component';
import { NavFiltersComponent } from './components/layout/nav-filters/nav-filters.component';
import { TalentContentComponent } from './components/layout/talent-content/talent-content.component';
import { AddEditFeedbackComponent } from './components/utils/add-edit-feedback/add-edit-feedback.component';
import { AddEditLanguagesComponent } from './components/utils/add-edit-languages/add-edit-languages.component';
import { ButtonDropdownComponent } from './components/utils/buttons/button-dropdown.component';
import { ProfileComponent } from './components/utils/cards/profile/profile.component';
import { EducationalExperienceFormComponent } from './components/utils/experience-form/educational-experience-form/educational-experience-form.component';
import { FormErrorComponent } from './components/utils/form-error/form-error.component';
import { CheckboxInputComponent } from './components/utils/form-inputs/checkbox-input-component';
import { DateInputComponent } from './components/utils/form-inputs/date-input-component';
import { FileInputComponent } from './components/utils/form-inputs/file-input-component';
import { LanguageSelectComponent } from './components/utils/form-inputs/language-select-component';
import { RadioInputComponent } from './components/utils/form-inputs/radio-input-component';
import { SelectInputByValueComponent } from './components/utils/form-inputs/select-input-byvalue-component';
import { SelectInputComponent } from './components/utils/form-inputs/select-input-component';
import { SubtitleFormComponent } from './components/utils/form-inputs/subtitle-form-component';
import { TextInputComponent } from './components/utils/form-inputs/text-input-component';
import { TextAreaInputComponent } from './components/utils/form-inputs/textarea-input.componen';
import { CheckboxDropdownSelectPrevModalComponent } from './components/utils/modals/checkbox-droddown-prev-modal.component';
import { CheckboxDropdownMultipleSelectModalComponent } from './components/utils/modals/checkbox-dropdown-multiple-select/checkbox-dropdown-multiple-select-modal.component';
import { CheckboxDropdownSelectDataModalComponent } from './components/utils/modals/checkbox-dropdown-select-modal.component';
import { CheckboxModalComponent } from './components/utils/modals/checkbox-modal.component';
import { BaseModalFormComponent } from './components/utils/modals/forms/base-modal-form-component';
import { CancelSaveButtonsComponent } from './components/utils/modals/forms/cancel-save-buttons';
import { DescriptionModalFormComponent } from './components/utils/modals/forms/description-moda-form-component';
import { EducationModalFormComponent } from './components/utils/modals/forms/education-form-component';
import { ExperienceModalFormComponent } from './components/utils/modals/forms/experience-form-component';
import { FeedbackModalFormComponent } from './components/utils/modals/forms/feedback-form-component';
import { LanguageModalFormComponent } from './components/utils/modals/forms/language-form-component';
import { ModalFormsCollection } from './components/utils/modals/forms/modal-forms-collection';
import { NewFileModalFormComponent } from './components/utils/modals/forms/new-file-form-component';
import { NewProfilePicModalFormComponent } from './components/utils/modals/forms/new-profile-pic-form-component';
import { SalaryBandModalForm } from './components/utils/modals/forms/salary-band-form-component';
import { SocialsModalFormComponent } from './components/utils/modals/forms/socials-form-component';
import { SoftSkillsModalFormComponent } from './components/utils/modals/forms/soft-skills-form-component';
import { TechnicalSkillsModalFormComponent } from './components/utils/modals/forms/technical-skills-form-component';
import { RadioModalComponent } from './components/utils/modals/radio-modal.component';
import { RatingComponent } from './components/utils/rating/rating.component';
import { PillTagComponent } from './components/utils/tags/pill-tag/pill-tag-component';

import { AddLanguageComponent } from './components/utils/add-edit-languages/add-language-component/add-language.component';
import { EditLanguageComponent } from './components/utils/add-edit-languages/edit-language-component/edit-language.component';
import { WorkExperienceFormComponent } from './components/utils/experience-form/work-experience-form/work-experience-form-component';
import { LanguageLevelSelectComponent } from './components/utils/form-inputs/language-level-select';
import { AddEducationalExperiencesFormComponent } from './components/utils/modals/experiences-form/add-experiences/add-educational-experience/add-educational-experiences-form.component';
import { AddWorkExperiencesFormComponent } from './components/utils/modals/experiences-form/add-experiences/add-work-experience/add-work-experiences-form.component';
import { EditEducationalExperiencesFormComponent } from './components/utils/modals/experiences-form/edit-experiences/edit-educational-experience/edit-educational-experiences-form.component';
import { EditWorkExperiencesFormComponent } from './components/utils/modals/experiences-form/edit-experiences/edit-work-experience/edit-work-experiences-form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    RadioModalComponent,
    CheckboxModalComponent,
    ButtonDropdownComponent,
    ProfileComponent,
    AddEditLanguagesComponent,
    AddEditFeedbackComponent,
    /* Input */
    CheckboxInputComponent,
    TextInputComponent,
    SubtitleFormComponent,
    FileInputComponent,
    DateInputComponent,
    LanguageSelectComponent,
    LanguageLevelSelectComponent,
    SelectInputComponent,
    RadioInputComponent,
    TextAreaInputComponent,
    SelectInputByValueComponent,
    /* Forms */
    WorkExperienceFormComponent,
    EducationalExperienceFormComponent,
    FormErrorComponent,
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
    RatingComponent,
    SoftSkillsModalFormComponent,
    DescriptionModalFormComponent,
    AddWorkExperiencesFormComponent,
    AddEducationalExperiencesFormComponent,
    EditEducationalExperiencesFormComponent,
    EditWorkExperiencesFormComponent,
    AddLanguageComponent,
    EditLanguageComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    MainComponent,
    RadioModalComponent,
    CheckboxModalComponent,
    ButtonDropdownComponent,
    ProfileComponent,
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
    SelectInputComponent,
    RadioInputComponent,
    TextAreaInputComponent,
    DateInputComponent,
    SelectInputByValueComponent,
    /* Modal forms */
    ModalFormsCollection,
    ExperienceModalFormComponent,
    EducationModalFormComponent,
    LanguageModalFormComponent,
    FeedbackModalFormComponent,
    SoftSkillsModalFormComponent,
    DescriptionModalFormComponent,
    AddEducationalExperiencesFormComponent,
    AddWorkExperiencesFormComponent,
    EditEducationalExperiencesFormComponent,
    EditWorkExperiencesFormComponent,
    /* Forms */
    EducationalExperienceFormComponent,
    WorkExperienceFormComponent,
    FormErrorComponent,
    /* Dropdown modals */
    CheckboxDropdownSelectPrevModalComponent,
    CheckboxDropdownMultipleSelectModalComponent,
    CheckboxDropdownSelectDataModalComponent,
    /* Tags */
    PillTagComponent,
  ],
})
export class SharedModule {}
