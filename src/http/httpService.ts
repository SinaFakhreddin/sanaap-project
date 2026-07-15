import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

class HttpService {
  private axiosService: AxiosInstance;
  constructor() {
    this.axiosService = axios.create({
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    this.axiosService.interceptors.response.use(
      (successResponse) => successResponse,
      async (error) => {
        const { status } = error?.response || {};
        if (status === 401) {
          console.warn("Unauthorized request detected");
        }
        return Promise.reject(error);
      },
    );

    this.axiosService.interceptors.request.use(async (request) => {
      return request;
    });
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosService.get(
      `${import.meta.env.VITE_BASE_URL}${url}`,
      config,
    );
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosService.post(
      `${import.meta.env.VITE_BASE_URL}${url}`,
      data,
      config,
    );
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosService.put(
      `${import.meta.env.VITE_BASE_URL}${url}`,
      data,
      config,
    );
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosService.delete(
      `${import.meta.env.VITE_BASE_URL}${url}`,
      config,
    );
  }
}

const httpService = new HttpService();
export { httpService };
