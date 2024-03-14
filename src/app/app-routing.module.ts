import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TalentCreateComponent } from './features/talent/talent-create/talent-create.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MainComponent } from './shared/components/layout/main/main.component';
import { AuthGuard } from './core/guards/authGuard.';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', component: DashboardComponent },
      { path: 'new-talent', component: TalentCreateComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
