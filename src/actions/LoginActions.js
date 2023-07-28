import { api_url } from "@/config";

export const checkLogin = async (token) => {
  if (token == null) return false;

  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
        token: token,
    }),
  };

  const response = await fetch(`${api_url}/check-admin-login`, requestOptions);

  const data = await response.json();

  if (data.status == "error") return false;

  return true;
};

export const login = async (body) => {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  };

  const response = await fetch(`${api_url}/admin-login`, requestOptions);

  const data = await response.json();

  return data;
};
