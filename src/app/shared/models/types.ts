export interface ProcessedWorkExperiences {
  id?: number;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}

export interface ProcesseEducationalExperiences {
  educationalInstitute: string;
  career: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}
