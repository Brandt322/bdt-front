import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { User } from 'src/app/shared/models/interfaces/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  userLoginOn: boolean = false;
  userData?: User;
  private loginSubscription?: Subscription;
  private userSubscription?: Subscription;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLogin.subscribe({
      next: (isLogged) => {
        this.userLoginOn = isLogged;
      }
    })

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
        console.log(userData.username)
      }
    })
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
