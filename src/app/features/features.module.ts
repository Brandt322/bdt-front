import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TalentCreateComponent } from './talent/talent-create/talent-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, TalentCreateComponent],
  imports: [CommonModule, AppRoutingModule, SharedModule, ReactiveFormsModule],
  exports: [DashboardComponent, TalentCreateComponent],
})
export class FeaturesModule { }
