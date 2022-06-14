export interface Consulta {
    id: number;
    id_historia_per: number;
    peso: string;
    talla: string;
    imc: string;
    prsist: string;
    prdist: string;
    temp: string;
    fc: string;
    sat: string;
    fr: string;
    observacion_signos: string;
    motivo_atencion: string;
    enfermedad_actual: string;
    antecedentes: string;
    examen_fisico: string;
    resultados_examenes: string;
    codigo_cie10_per: string;
    tratamiento: string;
    id_cronologia_per: string;
    id_condicion_per: string;
    id_tipo_per: string;
    id_empleado_per: string;
    estado: boolean;
    fecha: Date;
    empleado: string;
}
