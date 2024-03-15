import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { LoginRequest } from 'src/app/shared/models/interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';
  constructor(private router: Router, private loginService: LoginService, private toast: ToastrService, private userService: UserService) { }

  public login(loginRequest: LoginRequest): void {
    this.loginService.login(loginRequest).subscribe(({ token }) => {
      sessionStorage.setItem(this.tokenKey, token);
      this.router.navigate(['/main']);
      this.toast.success('Bienvenido');
    });
    // this.router.navigate(['/main']);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.toast.info('Hasta luego');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = sessionStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? sessionStorage.getItem(this.tokenKey) : null;
  }
}
