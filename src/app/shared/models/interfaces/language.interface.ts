export interface Language {
  id: number;
  language: string;
  abrv: string;
}

export interface LanguageResponse {
  languageId: number;
  language: string;
  level: string;
  numberOfStars: number;
}

export interface LanguageRequest {
  languageId: number;
  levelId: number;
  numberOfStars: number;
}
