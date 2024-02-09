import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  AddAbilityButtonComponent,
  CheckboxComponent,
  FileInputComponent,
  SubtitleFormComponent,
  TalentCreateComponent,
  TextInputComponent,
} from './talent/talent-create/talent-create.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TalentCreateComponent,
    TextInputComponent,
    SubtitleFormComponent,
    FileInputComponent,
    AddAbilityButtonComponent,
    CheckboxComponent,
  ],
  imports: [CommonModule],
  exports: [DashboardComponent, TalentCreateComponent],
})
export class FeaturesModule {}
