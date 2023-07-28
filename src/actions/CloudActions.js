import { api_url } from "@/config";

export const getCloudModules = async (token) => {
  if (token == null) return [];

  const response = await fetch(
    `${api_url}/cloud-modules?token=${token}`
  );

  const data = await response.json();

  if (response.status == 200) {
    return data.modules;
  }

  return [];
};

export const createCloudCompany = async (token, body) => {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  };

  const response = await fetch(
    `${api_url}/create-cloud-company?token=${token}`,
    requestOptions
  );

  const data = await response.json();

  return data;
};

export const getCloudCompanies = async (token) => {
    if (token == null) return [];
  
    const response = await fetch(
      `${api_url}/cloud-companies?token=${token}`
    );
  
    const data = await response.json();
  
    if (response.status == 200) {
      return data.cloud_companies;
    }
  
    return [];
  };