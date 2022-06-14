import { Cliente } from '../models/clientes';
import { Diagnostico } from '../models/diagnostico';

export interface CargarClientes {
    clientes: Cliente[];
}

export interface CargarDiagnosticos {
    diagnosticos: Diagnostico[];
}