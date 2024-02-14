import { Byte } from '@angular/compiler/src/util';

export interface Archivos {
  id_archivo: number;
  ar_archivo: Byte[];
  no_archivo: string;
  fl_tipo_archivo: string;
  id_talento: number;
}

export interface ExperienciaEducativa {
  id_experiencia_educativa: number;
  no_carrera: string;
  fe_fin: string;
  fe_inicio: string;
  no_grado: string;
  no_institucion_educativa: string;
  id_talento: number;
}

export interface ExperienciaLaboral {
  id_experiencia_laboral: number;
  fe_fin: string;
  fe_inicio: string;
  no_experiencia_laboral: string;
  no_puesto: string;
  id_talento: number;
}

export interface FeedbackTalento {
  id_feedback: number;
  de_descripcion: string;
  nu_estrellas: number;
  id_talento: number;
}

export interface HabilidadBlanda {
  id_habilidad_blanda: number;
  no_habilidad: string;
  id_talento: number;
}

export interface HabilidadTecnica {
  id_habilidad_tecnica: number;
  nu_anios: number;
  no_habilidad: string;
  id_talento: number;
}

export interface ListaUsuario {
  id_lista_usuario: number;
  fe_creacion: string;
  no_lista_usuario: string;
  id_usuario: number;
}

export interface Master {
  id: number;
  de_descripcion: string;
  id_master: number;
  id_dos: number;
  id_tres: number;
  id_uno: number;
  string_dos: string;
  string_tres: string;
  string_uno: string;
}

export interface Talento {
  id_talento: number;
  ap_apellido_materno: string;
  ap_apellido_paterno: string;
  de_descripcion: string;
  fe_creacion: string;
  im_imagen: Byte[];
  di_github: string;
  di_linkdn: string;
  nu_monto_final: number;
  nu_monto_inicial: number;
  no_nombre: string;
  nu_celular: string;
}

export interface Usuario {
  id_usuario: number;
  ap_apellido_materno: string;
  ap_apellido_paterno: string;
  im_imagen: Byte[];
  no_nombre: string;
  pw_password: string;
  us_usuario: string;
}

export interface ListaUsuarioTalento {
  id_lista_usuario_detalle: number;
  id_lista_usuario: number;
  id_talento: number;
}

export interface MasterTalento {
  id_master_talento: number;
  id: number;
  id_talento: number;
}

export interface MasterTalentoIdioma {
  id_master_talento_idioma: number;
  id_idioma: number;
  id_nivel: number;
  nu_estrellas: number;
  id_talento: number;
}

export interface MasterUsuario {
  id_master_usuario: number;
  id_rol: number;
  id_usuario: number;
}

export interface Pais {
  id: number;
  pais: string;
  abreviatura: string;
}

export interface Ciudad {
  id: number;
  ciudad: string;
  paisId: number;
}

export interface Rol {
  id: number;
  rol: string;
  abreviatura: string;
}

export interface Moneda {
  id: number;
  moneda: string;
  abreviatura: string;
}

export interface Perfil {
  id: number;
  perfil: string;
  abreviatura: string;
}

export interface Idioma {
  id: number;
  idioma: string;
  abreviatura: string;
}

export interface Nivel {
  id: number;
  nivel: string;
}
