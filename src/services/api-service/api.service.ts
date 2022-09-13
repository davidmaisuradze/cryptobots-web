import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { API_PATHS } from '../../constants';
import { MissingAuthTokenError } from '../../errors';
import { cookieAuthService } from '../cookie-auth-service';
import { getMappedRequestOptions, RequestConfigType, RequestOptionsType } from './helpers';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    console.log(baseURL, 'baseURL');
    this.axiosInstance = axios.create({ baseURL });

    // interceptor will be triggered on error code 401
    createAuthRefreshInterceptor(this.axiosInstance, async (failedRequest: AxiosError): Promise<void> => {
      if (
        !failedRequest?.config?.url ||
        !failedRequest?.response?.config?.headers ||
        failedRequest?.config?.url?.includes(API_PATHS.login)
      ) {
        throw failedRequest;
      }

      try {
        const { data } = await this.axiosInstance.post(
          API_PATHS.refreshToken,
          {
            refreshToken: cookieAuthService.getRefreshToken(),
          },
          // skipAuthRefresh param needed to escape interceptors from looping
          { ...getMappedRequestOptions({}), skipAuthRefresh: true } as AxiosRequestConfig,
        );

        const { accessToken, refreshToken } = data.token;
        cookieAuthService.setTokens(accessToken, refreshToken);

        failedRequest.response.config.headers.Authorization = `Bearer ${accessToken as string}`;
      } catch (error) {
        // authStore.setIsInvalidToken(true);
        // appStore.logout();
        throw error;
      }
    });

    this.axiosInstance.interceptors.request.use((request) => {
      const pathsWithoutAuth = [API_PATHS.login, API_PATHS.recoverPassword, API_PATHS.resetPassword];

      if (!request?.headers || pathsWithoutAuth.some((path) => request.url?.includes(path))) {
        return request;
      }

      const token = cookieAuthService.getAccessToken();
      if (!token) {
        throw new MissingAuthTokenError();
      }

      request.headers.Authorization = `Bearer ${token}`;

      return request;
    });
  }

  public get<T>(url: string, config?: RequestOptionsType): Promise<T> {
    if (!config) {
      return this.axiosInstance.get(url);
    }

    return this.axiosInstance.get(url, getMappedRequestOptions(config));
  }

  public post<T, D>(url: string, payload: T, config?: RequestConfigType): Promise<D> {
    if (!config) {
      console.log(this.axiosInstance.defaults.baseURL, 'instancea');
      console.log(url, 'url');
      return this.axiosInstance.post(url, payload);
    }

    return this.axiosInstance.post(url, payload, getMappedRequestOptions(config));
  }

  public put<T, D>(url: string, payload: T, config?: RequestConfigType): Promise<D> {
    if (!config) {
      return this.axiosInstance.put(url, payload);
    }

    return this.axiosInstance.put(url, payload, getMappedRequestOptions(config));
  }

  public patch<T, D>(url: string, payload: T, config?: RequestConfigType): Promise<D> {
    if (!config) {
      return this.axiosInstance.patch(url, payload);
    }

    return this.axiosInstance.patch(url, payload, getMappedRequestOptions(config));
  }

  public delete<T>(url: string, config?: RequestConfigType): Promise<T> {
    if (!config) {
      return this.axiosInstance.delete(url);
    }

    const { payload, ...options } = config;

    if (!payload) {
      return this.axiosInstance.delete(url, getMappedRequestOptions(options));
    }

    return this.axiosInstance.delete(url, {
      ...getMappedRequestOptions(options),
      data: {
        ...payload,
      },
    });
  }
}

export const apiService = new ApiService();
