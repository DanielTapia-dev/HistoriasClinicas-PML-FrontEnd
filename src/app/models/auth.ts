export interface LoginResponse {
    id: number;
    usuario: string;
    nombre1: string;
    nombre2: string;
    apellido1: string;
    apellido2: string;
    token: string;
    tipo: string;
    ok: boolean;
}

export interface Usuario {
    id: number;
    usuario: string;
    nombre1: string;
    nombre2: string;
    apellido1: string;
    apellido2: string;
    tipo: string;
}
