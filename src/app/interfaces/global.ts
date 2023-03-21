export enum TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question'
}

export interface RequestComents {
  id: number;
  nombre: string;
  comentario: string;
  puntos: number;
  cant_respuestas: number;
  fecha: Date;
  idcomentario: number;
  avatar: string;
  respuestas?: RequestComents[];
  templaterespuesta?: true;
}

export interface Coments {
  id?: number;
  nombre: string;
  comentario: string;
  puntos: number;
  cant_respuestas: number;
  idcomentario: number;
  avatar: string;
}
