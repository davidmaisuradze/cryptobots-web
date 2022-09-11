import { AxiosRequestConfig } from 'axios';

const baseHeaders = {
  'Content-Type': 'application/json',
};

export type RequestConfigType = Partial<{
  withBlockchainNetwork: boolean;
  payload: Record<string, any>;
  requestConfig: AxiosRequestConfig;
}>;

export type RequestOptionsType = Omit<RequestConfigType, 'payload'>;

export function getMappedRequestOptions(options: RequestOptionsType): Record<string, unknown> {
  const { requestConfig } = options;
  const config: Record<string, unknown> = {
    ...requestConfig,
  };

  const headers: typeof baseHeaders & Partial<{ Authorization: string }> = {
    ...baseHeaders,
    ...requestConfig?.headers,
  };

  if (Object.keys(headers).length) {
    config.headers = headers;
  }

  return config;
}
