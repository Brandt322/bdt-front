import { EducationalExperience, EducationalExperienceRequest, EducationalExperienceResponse } from "./educationalExperience.interface";
import { File } from "./file.interface";
import { LanguageRequest, LanguageResponse } from "./language.interface";
import { SoftSkill, SoftSkillRequest, SoftSkillResponse } from "./softSkill.interface";
import { TechnicalSkillRequest, TechnicalSkillResponse } from "./technicalSkill.interface";
import { UserBasic } from "./user.interface";
import { WorkExperience, WorkExperienceRequest, WorkExperienceResponse } from "./workExperience.interface";

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
  averageRating: number;
  feedbacksList: FeedbackResponse[];
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
  lists: UserTalentListDto[];
  averageRating: number;
  image: string;
  description: string;
  initialAmount: number;
  finalAmount: number;
  cellPhoneNumber: string;
  linkedinLink: string;
  githubLink: string;
  feedbacksList: FeedbackResponse[];
  softSkillsList: SoftSkillResponse[];
  technicalSkillsList: TechnicalSkillResponse[];
  educationalExperiencesList: EducationalExperience[];
  workExperiencesList: WorkExperience[];
  languagesList: LanguageResponse[];
}

export interface UserTalentListDto {
  idInList: number;
  userList: UserListDto;
}

export interface UserListDto {
  id: number;
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
  data: string;
  talentsId: number[];
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
  averageRating: number;
  feedbacksList: FeedbackResponse[];
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

export interface FeedbackResponse {
  id: number;
  starsNumber: number;
  description: string;
  user: UserBasic;
}
