export interface EducationalExperience {
  id: number;
  educationalInstitute: string;
  career: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
}

export interface EducationalExperienceResponse {
  educationalInstitute: string;
  career: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
}

export interface EducationalExperienceRequest {
  educationalInstitute: string;
  career: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
}
