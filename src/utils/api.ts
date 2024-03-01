import axios from "axios";
import {API_BASE_URL} from '../constant'

type Headers = Record<string, string>;
type QueryParams = Record<string, string | number>;

export const apiService = {
  get: async <T = any>(
    endpoint: string,
    params: QueryParams = {},
    headers: Headers = {},
    excludeToken: boolean = false
  ): Promise<T> => {
    try {
      const response = await axios.get<T>(`${API_BASE_URL}/${endpoint}`, {
        headers: excludeToken ? headers : addAuthorizationHeader(headers),
        params,
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },
  post: async <T = any>(
    endpoint: string,
    data: any,
    headers: Headers = {},
    excludeToken: boolean = false
  ): Promise<T> => {
    try {
      const response = await axios.post<T>(
        `${API_BASE_URL}/${endpoint}`,
        data,
        {
          headers: excludeToken ? headers : addAuthorizationHeader(headers),
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  },
  put: async <T = any>(
    endpoint: string,
    data: any,
    headers: Headers = {}
  ): Promise<T> => {
    try {
      const response = await axios.put<T>(`${API_BASE_URL}/${endpoint}`, data, {
        headers: addAuthorizationHeader(headers),
      });
      return response.data;
    } catch (error) {
      console.error(`Error putting to ${endpoint}:`, error);
      throw error;
    }
  },
  delete: async <T = any>(
    endpoint: string,
    headers: Headers = {}
  ): Promise<T> => {
    try {
      const response = await axios.delete<T>(`${API_BASE_URL}/${endpoint}`, {
        headers: addAuthorizationHeader(headers),
      });
      return response.data;
    } catch (error) {
      console.error(`Error putting to ${endpoint}:`, error);
      throw error;
    }
  },
} as const;

function addAuthorizationHeader(headers: Headers): Headers {
  const accessToken =  localStorage.getItem("token");
  if (accessToken) {
    return {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    };
  }
  return headers;
}
