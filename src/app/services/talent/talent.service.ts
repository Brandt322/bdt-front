import { TALENT_API_ENDPOINTS } from './../../core/global/constants/api-endpoints';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TalentRequest, TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  private uri = environment.url

  constructor(private http: HttpClient) { }

  getTalent(): Observable<TalentResponse[]> {
    return this.http.get<TalentResponse[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}`);
  }

  createtalent(talent: TalentRequest): Observable<Object> {
    return this.http.post(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}`, talent);
  }
}
