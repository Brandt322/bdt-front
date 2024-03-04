import { TALENT_API_ENDPOINTS } from './../../core/global/constants/api-endpoints';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { File } from 'src/app/shared/models/interfaces/file.interface';
import { TalentFilterParams, TalentRequest, TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  private uri = environment.url

  constructor(private http: HttpClient) { }

  private handleImage(image: string): string {
    let imagePrefix = 'data:image/jpeg;base64,';
    if (image.startsWith('iVBOR')) {
      imagePrefix = 'data:image/png;base64,';
    } else if (image.startsWith('UklGR')) {
      imagePrefix = 'data:image/webp;base64,';
    }
    return imagePrefix + image;
  }

  private handleFiles(filesList: File[]): File[] {
    const filePrefix = 'data:application/pdf;base64,';
    return filesList.map(file => {
      file.file = filePrefix + file.file;
      return file;
    });
  }

  private handleTalentData(talent: TalentResponse) {
    if (talent.image) {
      talent.image = this.handleImage(talent.image);
    }
    if (talent.filesList) {
      talent.filesList = this.handleFiles(talent.filesList);
    }
    return talent;
  }

  getTalent(): Observable<TalentResponse[]> {
    return this.http.get<TalentResponse[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}`).pipe(
      map(talents => talents.map(talent => this.handleTalentData(talent)))
    );
  }

  getTalentById(id: number): Observable<TalentResponse> {
    return this.http.get<TalentResponse>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}/${id}`).pipe(
      map(talent => this.handleTalentData(talent))
    );
  }

  createtalent(talent: TalentRequest): Observable<Object> {
    return this.http.post(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}`, talent);
  }

  //Post request to filter talents by technical skills, language and level
  getTalentsByTechnicalSkillsLanguageAndLevel(params: TalentFilterParams[]): Observable<TalentResponse[]> {
    return this.http.post<TalentResponse[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUESTMAPPING}/${TALENT_API_ENDPOINTS.FILTER}`, params).pipe(
      map(talents => talents.map(talent => this.handleTalentData(talent)))
    );
  }


}
