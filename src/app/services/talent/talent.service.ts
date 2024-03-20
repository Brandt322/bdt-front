import { TALENT_API_ENDPOINTS } from './../../core/global/constants/api-endpoints';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EducationalExperienceRequest } from 'src/app/shared/models/interfaces/educationalExperience.interface';
import { FeedbackRequest } from 'src/app/shared/models/interfaces/feedback.interface';
import { File } from 'src/app/shared/models/interfaces/file.interface';
import { LanguageRequest } from 'src/app/shared/models/interfaces/language.interface';
import { FilterTalentResponse, TalentFilterParams, TalentRequest, TalentResponse, BasicTalentResponse, TalentTechnicalSkillRequest, TalentSoftSkillRequest, TalentSalaryRequest, TalentSocialRequest } from 'src/app/shared/models/interfaces/talent.interface';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';
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

  private handleFilterTalentData(talent: FilterTalentResponse) {
    if (talent.image) {
      talent.image = this.handleImage(talent.image);
    }
    // No intentes manejar filesList aquí, ya que FilterTalentResponse no tiene esa propiedad
    return talent;
  }

  private handleBasicTalentData(talent: BasicTalentResponse) {
    if (talent.image) {
      talent.image = this.handleImage(talent.image);
    }
    return talent;
  }

  getBasicTalent(): Observable<BasicTalentResponse[]> {
    return this.http.get<BasicTalentResponse[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.BASIC_TALENTS}`).pipe(
      map(talents => talents.map(talent => this.handleBasicTalentData(talent)))
    );
  }

  getTalent(): Observable<TalentResponse[]> {
    return this.http.get<TalentResponse[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}`).pipe(
      map(talents => talents.map(talent => this.handleTalentData(talent)))
    );
  }

  getTalentById(id: number): Observable<TalentResponse> {
    return this.http.get<TalentResponse>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${id}`).pipe(
      map(talent => this.handleTalentData(talent))
    );
  }

  createtalent(talent: TalentRequest): Observable<Object> {
    return this.http.post(`${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}`, talent);
  }

  //Post request to filter talents by technical skills, language and level
  getTalentsByTechnicalSkillsLanguageAndLevel(params: TalentFilterParams[]): Observable<FilterTalentResponse[]> {
    return this.http.post<FilterTalentResponse[]>(`${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.FILTER}`, params).pipe(
      map(talents => talents.map(talent => this.handleFilterTalentData(talent)))
    );
  }

  addTechnicalSkill(talentId: number, technicalSkillRequest: TalentTechnicalSkillRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.ADD_TECHNICAL_SKILL}/${talentId}`;
    return this.http.post(url, technicalSkillRequest);
  }

  addSoftSkill(talentId: number, softSkillRequest: TalentSoftSkillRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.ADD_SOFT_SKILL}/${talentId}`;
    return this.http.post(url, softSkillRequest);
  }

  addWorkExperience(talentId: number, workExperienceRequest: WorkExperienceRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.ADD_WORK_EXPERIENCE}/${talentId}`;
    return this.http.post(url, workExperienceRequest);
  }

  addEducationalExperience(talentId: number, educationalExperienceRequest: EducationalExperienceRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.ADD_EDUCATIONAL_EXPERIENCE}/${talentId}`;
    return this.http.post(url, educationalExperienceRequest);
  }

  addLanguage(talentId: number, languageRequest: LanguageRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.ADD_LANGUAGE}/${talentId}`;
    return this.http.post(url, languageRequest);
  }

  addFile(talentId: number, file: File): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${talentId}/${TALENT_API_ENDPOINTS.ADD_FILE}`;
    return this.http.post(url, file);
  }

  addFeedback(feedbackRequest: FeedbackRequest): Observable<any> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.ADD_FEEDBACK}`;
    return this.http.post(url, feedbackRequest);
  }

  updateSalaryBand(talentId: number, talentRequest: TalentSalaryRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.UPDATE_SALARY_TALENT}/${talentId}`;
    return this.http.put(url, talentRequest);
  }

  updateSocials(talentId: number, socialRequest: TalentSocialRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.UPDATE_SOCIALS}/${talentId}`;
    return this.http.put(url, socialRequest);
  }

  updateDescription(talentId: number, description: string) {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.UPDATE_DESCRIPTION}/${talentId}`;
    return this.http.put(url, { description });
  }

  updateImage(talentId: number, image: string): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.UPDATE_IMAGE}/${talentId}`;
    return this.http.put(url, { image });
  }

  updateWorkExperience(talentId: number, workExpId: number, workExperienceRequest: WorkExperienceRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${talentId}/${TALENT_API_ENDPOINTS.UPDATE_WORK_EXPERIENCE}/${workExpId}`;
    return this.http.put(url, workExperienceRequest);
  }

  updateEducationalExperience(talentId: number, eduExpId: number, educationalExperienceRequest: EducationalExperienceRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${talentId}/${TALENT_API_ENDPOINTS.UPDATE_EDUCATIONAL_EXPERIENCE}/${eduExpId}`;
    return this.http.put(url, educationalExperienceRequest);
  }

  updateLanguage(talentId: number, languageId: number, languageRequest: LanguageRequest): Observable<object> {
    const url = `${this.uri}/${TALENT_API_ENDPOINTS.REQUEST_MAPPING}/${TALENT_API_ENDPOINTS.UPDATE_LANGUAGE}/${talentId}/${languageId}`;
    return this.http.put(url, languageRequest);
  }
}
