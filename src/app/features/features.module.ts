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
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

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
  imports: [CommonModule, AppRoutingModule, SharedModule],
  exports: [DashboardComponent, TalentCreateComponent],
})
export class FeaturesModule { }
