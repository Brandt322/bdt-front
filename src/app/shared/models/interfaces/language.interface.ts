export interface Language {
  id: number;
  language: string;
  abrv: string;
}

export interface LanguageResponse {
  id: number;
  languageId: number;
  language: string;
  levelId: number;
  level: string;
  numberOfStars: number;
}

export interface LanguageRequest {
  languageId: number;
  levelId: number;
  numberOfStars: number;
}
