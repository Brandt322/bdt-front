import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { User, UserResponse } from 'src/app/shared/models/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userData!: UserResponse;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userData
  }

  logout(): void {
    this.authService.logout();
  }
}
