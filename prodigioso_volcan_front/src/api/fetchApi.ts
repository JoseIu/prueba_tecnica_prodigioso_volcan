import { APIResponseInterface } from '../interface/apiResponse.interface';

export const fetchApi = async (
  path: string,
  method: string = 'GET',
  credential?: string | null,
  code?: string | null
): Promise<APIResponseInterface> => {
  const BACK_END_URL = import.meta.env.VITE_BACK_URL;

  const fetchOptions: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credential}`,
    },
  };

  if (code) {
    fetchOptions.body = JSON.stringify({ code });
  }

  const response = await fetch(`${BACK_END_URL}${path}`, fetchOptions);

  const data: APIResponseInterface = await response.json();

  return data;
};
