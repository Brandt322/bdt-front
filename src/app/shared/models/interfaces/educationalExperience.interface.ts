export interface EducationalExperience {
  id: number;
  educationalInstitute: string;
  career: string;
  degree: string;
  startDate: Date;
  endDate: Date;
}

export interface EducationalExperienceResponse {
  educationalInstitute: string;
  career: string;
  degree: string;
  startDate: Date;
  endDate: Date;
}

export interface EducationalExperienceRequest {
  educationalInstitute: string;
  career: string;
  degree: string;
  startDate: Date;
  endDate: Date;
}
