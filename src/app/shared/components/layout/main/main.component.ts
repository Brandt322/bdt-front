import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { User } from 'src/app/shared/models/interfaces/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userLoginOn: boolean = false;
  userData?: User;
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

}
