import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { LoginRequest } from 'src/app/shared/models/interfaces/login.interface';
import { User } from 'src/app/shared/models/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private uri = environment.url;
  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<User>({
    id: 0,
    name: 'John',
    paternalSurname: 'Doe',
    maternalSurname: 'Smith',
    image: 'https://www.patriotledger.com/gcdn/authoring/2009/05/01/NPAL/ghows-WL-0a3a8372-6ef2-4a88-8496-f2b829ece2df-677b0e69.jpeg?width=660&height=502&fit=crop&format=pjpg&auto=webp',
    username: 'leslie.linvingston@fractal.com',
    password: '123',
  });

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<User> {
    // console.log('credenciales: ', credentials);
    return this.http.get<User>('../../../assets/data.json').pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserLogin.next(true);
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get isLogged(): Observable<boolean> {
    return this.currentUserLogin.asObservable();
  }
}
