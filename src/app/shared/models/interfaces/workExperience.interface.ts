export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
}

export interface WorkExperienceResponse {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
}

export interface WorkExperienceRequest {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
}
