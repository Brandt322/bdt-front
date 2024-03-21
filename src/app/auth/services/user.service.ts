import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { User, UserListRequest } from 'src/app/shared/models/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.url;

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${username}`);
  }

  addList(userListRequest: UserListRequest): Observable<object> {
    return this.http.post(`${this.baseUrl}/${USER_API_ENDPOINTS.ADD_LIST}`, userListRequest);
  }
}
