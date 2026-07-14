import axios from "axios";

// Instância do Axios apontando para a porta padrão do json-server
export const api = axios.create({
  baseURL: "exemplo"
});

// método para listar (GET)
export const buscar = async (url: string, setDado: Function) => {
  const resposta = await api.get(url);
  setDado(resposta.data);
};

// método para cadastrar (POST)
export const cadastrar = async (url: string, dados: Object, setDado: Function) => {
  const resposta = await api.post(url, dados);
  setDado(resposta.data);
};

// método para atualizar (PUT)
export const atualizar = async (url: string, dados: Object, setDado: Function) => {
  const resposta = await api.put(url, dados);
  setDado(resposta.data);
};

// método para deletar (DELETE)
export const deletar = async (url: string) => {
  await api.delete(url);
};