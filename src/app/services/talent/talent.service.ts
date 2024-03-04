import { TALENT_API_ENDPOINTS } from './../../core/global/constants/api-endpoints';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterTalentResponse, TalentFilterParams, TalentRequest, TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';
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

  getTalentById(id: number): Observable<TalentResponse> {
    return this.http.get<TalentResponse>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}/${id}`);
  }

  createtalent(talent: TalentRequest): Observable<Object> {
    return this.http.post(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}`, talent);
  }

  //Post request to filter talents by technical skills, language and level
  getTalentsByTechnicalSkillsLanguageAndLevel(params: TalentFilterParams[]): Observable<FilterTalentResponse[]> {
    return this.http.post<FilterTalentResponse[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}/${TALENT_API_ENDPOINTS.FILTER}`, params);
  }
}
