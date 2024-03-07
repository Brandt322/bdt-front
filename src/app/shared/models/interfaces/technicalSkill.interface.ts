export interface TechnicalSkill {
  id: number;
  skill: string;
  years: number;
}

export interface TechnicalSkillResponse {
  id: number;
  skill: string;
  years: number;
}

export interface TechnicalSkillRequest {
  skill: string;
  years: number;
}
