import { EducationalExperienceRequest, EducationalExperienceResponse } from "./educationalExperience.interface";
import { LanguageRequest, LanguageResponse } from "./language.interface";
import { SoftSkill, SoftSkillRequest } from "./softSkill.interface";
import { TechnicalSkillRequest, TechnicalSkillResponse } from "./technicalSkill.interface";
import { WorkExperienceRequest, WorkExperienceResponse } from "./workExperience.interface";

export interface TalentResponse {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  country: string;
  city: string;
  currency: string;
  fileList: File[];
  profile: string;
  image: string;
  description: string;
  initialAmount: number;
  finalAmount: number;
  cellPhoneNumber: string;
  linkedinLink: string;
  githubLink: string;
  softSkillsList: SoftSkill[];
  technicalSkillsList: TechnicalSkillResponse[];
  educationalExperiencesList: EducationalExperienceResponse[];
  workExperiencesList: WorkExperienceResponse[];
  languagesList: LanguageResponse[];
}

export interface TalentRequest {
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  countryId: number;
  cityId: number;
  currencyId: number;
  fileList: File[];
  image: string;
  description: string;
  initialAmount: number;
  finalAmount: number;
  cellPhoneNumber: string;
  linkedinLink: string;
  githubLink: string;
  softSkillsList: SoftSkillRequest[];
  technicalSkillsList: TechnicalSkillRequest[];
  educationalExperiencesList: EducationalExperienceRequest[];
  workExperiencesList: WorkExperienceRequest[];
  languagesList: LanguageRequest[];
}
