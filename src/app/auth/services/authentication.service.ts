import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';
  constructor(private router: Router, private loginService: LoginService, private toast: ToastrService) { }

  public login(username: string, password: string): void {
    this.loginService.login(username, password).subscribe(({ token }) => {
      localStorage.setItem(this.tokenKey, token);
      this.toast.success('Bienvenido');
      this.router.navigate(['/main']);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.toast.info('Hasta luego');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
