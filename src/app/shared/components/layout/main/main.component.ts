import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { User, UserResponse } from 'src/app/shared/models/interfaces/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  userLoginOn: boolean = false;
  userData?: UserResponse;
  private userKey = 'user_data';

  private loginSubscription?: Subscription;
  private userSubscription?: Subscription;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userLoginOn = this.authService.isLoggedIn();
    this.userData = JSON.parse(sessionStorage.getItem(this.userKey) || '{}');
    console.log(this.userLoginOn);
    console.log(this.userData);
  }

  ngOnDestroy(): void {
    // this.loginSubscription?.unsubscribe();
    // this.userSubscription?.unsubscribe();
  }

}
