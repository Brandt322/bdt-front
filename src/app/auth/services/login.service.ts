import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { LOGIN_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { LoginRequest } from 'src/app/shared/models/interfaces/login.interface';
import { User, UserResponse } from 'src/app/shared/models/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private uri = environment.url;
  private readonly userKey = 'user_data';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    // console.log('credenciales: ', credentials);
    return this.http.post<UserResponse>(`${this.uri}/${LOGIN_API_ENDPOINTS.LOGIN}`, loginRequest).pipe(
      tap((userData: UserResponse) => {
        sessionStorage.setItem(this.userKey, JSON.stringify(userData));
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

}
