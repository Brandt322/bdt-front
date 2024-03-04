import { TALENT_API_ENDPOINTS } from './../../core/global/constants/api-endpoints';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
    return this.http.get<TalentResponse>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}/${id}`).pipe(
      map(talent => {
        if (talent.image) {
          let imagePrefix = 'data:image/jpeg;base64,';
          if (talent.image.startsWith('iVBOR')) {
            imagePrefix = 'data:image/png;base64,';
          } else if (talent.image.startsWith('UklGR')) {
            imagePrefix = 'data:image/webp;base64,';
          }
          talent.image = imagePrefix + talent.image;
        }
        if (talent.filesList) {
          let filePrefix = 'data:application/pdf;base64,';
          talent.filesList.forEach(file => {
            file.file = filePrefix + file.file;
          });
        }
        return talent;
      })
    );
  }

  createtalent(talent: TalentRequest): Observable<Object> {
    return this.http.post(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}`, talent);
  }

  //Post request to filter talents by technical skills, language and level
  getTalentsByTechnicalSkillsLanguageAndLevel(params: TalentFilterParams[]): Observable<FilterTalentResponse[]> {
    return this.http.post<FilterTalentResponse[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}/${TALENT_API_ENDPOINTS.FILTER}`, params);
  }
}
