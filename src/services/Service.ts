import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
});

export const buscar = async <T>(
  url: string,
  setDados: (dados: T) => void
) => {
  const resposta = await api.get<T>(url);
  setDados(resposta.data);
};

export const cadastrar = async <TEntrada, TResposta>(
  url: string,
  dados: TEntrada,
  setDados: (dados: TResposta) => void
) => {
  const resposta = await api.post<TResposta>(url, dados);
  setDados(resposta.data);
};

export const atualizar = async <TEntrada, TResposta>(
  url: string,
  dados: TEntrada,
  setDados: (dados: TResposta) => void
) => {
  const resposta = await api.put<TResposta>(url, dados);
  setDados(resposta.data);
};

export const deletar = async (url: string) => {
  await api.delete(url);
};

export default api;