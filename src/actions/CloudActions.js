import { api_url } from "@/config";

export const getCloudModules = async (token) => {
  const response = await fetch(`${api_url}/cloud-modules?token=${token}`);

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
  const response = await fetch(`${api_url}/cloud-companies?token=${token}`);

  if (response.status == 200) {
    const data = await response.json();
    return data.cloud_companies;
  }

  return [];
};

export const getCloudCompanyDetails = async (token, cloud_company_id) => {
  const response = await fetch(
    `${api_url}/cloud-company-details/${cloud_company_id}?token=${token}`
  );

  if (response.status == 200) {
    const data = await response.json();
    return data.company_data;
  }

  return null;
};

export const editCloudCompanyModules = async (token, body) => {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  };

  const response = await fetch(
    `${api_url}/edit-cloud-company-modules?token=${token}`,
    requestOptions
  );

  const data = await response.json();

  return data;
};

export const changeCloudUserStatus = async (token, body) => {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  };

  const response = await fetch(
    `${api_url}/change-cloud-user-status?token=${token}`,
    requestOptions
  );

  const data = await response.json();

  return data;
};
