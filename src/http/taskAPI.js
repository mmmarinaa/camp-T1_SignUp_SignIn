import { $host } from "./index";

export const getRoles = async () => {
  const response = await $host.get("/api/get-roles");
  return response.data.roles;
};

export const signUp = async (data) => {
  const response = await $host.post("/api/sign-up", data);
  return response.data;
};

export const getCode = async (email) => {
  const response = await $host.get("/api/get-code", {
    params: { email: email },
  });
  return response.data;
};

// Функция для отправки JSON-объекта в POST запросе
export const setStatus = async (data) => {
  const response = await $host.post("/api/set-status", data);
  return response.data;
};
