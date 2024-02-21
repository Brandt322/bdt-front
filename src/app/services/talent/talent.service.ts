import { TALENT_API_ENDPOINTS } from './../../core/global/constants/api-endpoints';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Talent } from 'src/app/shared/models/interfaces/talent.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  private uri = environment.url

  constructor(private http: HttpClient) { }

  getTalent(): Observable<Talent[]> {
    return this.http.get<Talent[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}`);
  }

  createtalent(talent: Talent): Observable<Object> {
    return this.http.post(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}/${TALENT_API_ENDPOINTS.NEWTALENT}`, talent);
  }
}
