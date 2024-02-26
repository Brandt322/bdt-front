import { EducationalExperience, EducationalExperienceRequest } from "./educationalExperience.interface";
import { LanguageRequest, LanguageResponse } from "./language.interface";
import { SoftSkill, SoftSkillRequest } from "./softSkill.interface";
import { TechnicalSkill, TechnicalSkillRequest } from "./technicalSkill.interface";
import { WorkExperience, WorkExperienceRequest } from "./workExperience.interface";

export interface TalentResponse {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  countryId: string;
  cityId: string;
  currencyId: string;
  profileId: string;
  image: string;
  description: string;
  initialAmount: number;
  finalAmount: number;
  cellPhoneNumber: string;
  linkedinLink: string;
  githubLink: string;
  softSkillsList: SoftSkill[];
  technicalSkillsList: TechnicalSkill[];
  educationalExperiencesList: EducationalExperience[];
  workExperiencesList: WorkExperience[];
  languagesList: LanguageResponse[];
}

export interface TalentRequest {
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  countryId: number;
  cityId: number;
  currencyId: number;
  profileId: number;
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
