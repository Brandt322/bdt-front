import { EducationalExperienceRequest, EducationalExperienceResponse } from "./educationalExperience.interface";
import { File } from "./file.interface";
import { LanguageRequest, LanguageResponse } from "./language.interface";
import { SoftSkill, SoftSkillRequest, SoftSkillResponse } from "./softSkill.interface";
import { TechnicalSkillRequest, TechnicalSkillResponse } from "./technicalSkill.interface";
import { WorkExperienceRequest, WorkExperienceResponse } from "./workExperience.interface";

export interface BasicTalentResponse {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  country: string;
  city: string;
  currency: string;
  profile: string;
  initialAmount: number;
  finalAmount: number;
  image: string;
}

export interface TalentResponse {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  countryId: number;
  cityId: number;
  currencyId: number;
  profileId: number;
  country: string;
  city: string;
  currency: string;
  profile: string;
  filesList: File[];
  image: string;
  description: string;
  initialAmount: number;
  finalAmount: number;
  cellPhoneNumber: string;
  linkedinLink: string;
  githubLink: string;
  softSkillsList: SoftSkillResponse[];
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

export interface TalentFilterParams {
  languageId: number;
  levelId: number;
  technicalSkills: string[];
}

export interface FilterTalentResponse {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  country: string;
  city: string;
  currency: string;
  profile: string;
  initialAmount: number;
  finalAmount: number;
  image: string;
}

export interface TalentSocialRequest {
  githubLink: string;
  linkedinLink: string;
}

export interface TalentTechnicalSkillRequest {
  skill: string;
  years: number;
}

export interface TalentSoftSkillRequest {
  skill: string;
}

export interface TalentSalaryRequest {
  initialAmount: number;
  finalAmount: number;
  currencyId: number;
}
