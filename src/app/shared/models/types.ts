export interface ProcessedWorkExperiences {
  id?: number;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  description?: string;
}

export interface ProcesseEducationalExperiences {
  id?: number;
  educationalInstitute: string;
  career: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  description?: string;
}

export interface ProcesseLanguages {
  id?: number;
  language: string;
  languageId: number;
  level: string;
  levelId: number;
  numberOfStars: number;
}

export interface ProcesseFeedbackList {
  id?: number;
  starsNumber: number;
  description: string;
}
