import type PlanoSeguro from "./PlanoSeguro";
import type Usuario from "./Usuario";

export default interface SeguroVida {
  id: number;
  valorMensalidade: number;
  dataContratacao: string;
  plano: PlanoSeguro;
  usuario: Usuario;
}