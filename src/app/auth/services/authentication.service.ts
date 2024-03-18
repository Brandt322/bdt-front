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
  private AUTHORITIES_KEY = 'authorities';
  private roles: Array<string> = [];
  constructor(private router: Router, private loginService: LoginService, private toast: ToastrService, private userService: UserService) { }

  public login(loginRequest: LoginRequest): void {
    this.loginService.login(loginRequest).subscribe(({ token, bearer }) => {
      sessionStorage.setItem(this.tokenKey, token);
      sessionStorage.setItem('bearer', bearer);
      this.router.navigate(['/main']);
      this.toast.success('Bienvenido');
    });
    // this.router.navigate(['/main']);
  }

  logout(): void {
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('user_data');
    // sessionStorage.removeItem('bearer');
    sessionStorage.clear();
    this.toast.info('Hasta luego');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = sessionStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    // console.log(sessionStorage.getItem(this.tokenKey))
    return this.isLoggedIn() ? sessionStorage.getItem(this.tokenKey) : null;
  }

  public setAuthorities(authorities: string[]): void {
    sessionStorage.removeItem(this.AUTHORITIES_KEY);
    sessionStorage.setItem('authorities', JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(this.AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(this.AUTHORITIES_KEY) || '{}').forEach((authority: string) => {
        this.roles.push(authority);
      });
    }
    return this.roles;
  }
}
