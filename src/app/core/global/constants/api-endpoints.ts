export const MASTER_API_ENDPOINTS = {
  CITIES: 'cities',
  LANGUAGES: 'languages',
  CURRENCIES: 'currencies',
  LEVELS: 'levels',
  COUNTRIES: 'countries',
  PROFILES: 'profiles',
  SKILLS: 'all_technical_skills',
};

export const TALENT_API_ENDPOINTS = {
  REQUEST_MAPPING: 'api/v1/talent',
  BASIC_TALENTS: 'cards_data',
  FILTER: 'filter_talents',
  ADD_TALENT: 'create',
  ADD_TECHNICAL_SKILL: 'add_technical_skill',
  ADD_SOFT_SKILL: 'add_soft_skill',
  ADD_WORK_EXPERIENCE: 'add_work_exp',
  ADD_EDUCATIONAL_EXPERIENCE: 'add_edu_exp',
  ADD_LANGUAGE: 'add_language',
  ADD_FILE: 'add_file',
  ADD_FEEDBACK: 'add_feedback',
  UPDATE_IMAGE: 'update_image',
  UPDATE_SALARY_TALENT: 'update_salary_band',
  UPDATE_SOCIALS: 'update_socials',
  UPDATE_DESCRIPTION: 'update_description',
  UPDATE_WORK_EXPERIENCE: 'update_work_exp',
  UPDATE_EDUCATIONAL_EXPERIENCE: 'update_edu_exp',
  UPDATE_LANGUAGE: 'update_language',
  UPDATE_CV_FILE: 'update_file',
};

export const LOGIN_API_ENDPOINTS = {
  REQUEST_MAPPING: 'auth',
  LOGIN: 'login',
}

export const USER_API_ENDPOINTS = {
  REQUEST_MAPPING: 'api/v1/users',
  ADD_LIST: 'add_list',
  ADD_LIST_TALENT: 'add_talent_to_list',
  GET_LISTS_BY_USER_ID: 'lists',
}
