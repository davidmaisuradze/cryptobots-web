import { apiService } from './api-service';
import { API_PATHS } from '../constants';
import { IUser } from '../structures';

export interface IUserRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export interface IUserLoginDto {
  email: string;
  password: string;
}

export interface IRequestResetPasswordDto {
  email: string;
}

export const getProfile = async (): Promise<IUser> => {
  return apiService.get(API_PATHS.profile);
};

export const registerUser = async (payload: IUserRegisterDto): Promise<IUser> => {
  console.log('calling');
  return apiService.post<IUserRegisterDto, IUser>(API_PATHS.register, payload);
};

export const loginUser = async (payload: IUserLoginDto): Promise<IUser> => {
  return apiService.post<IUserLoginDto, IUser>(API_PATHS.login, payload);
};

export const logoutUser = async (): Promise<any> => {
  return apiService.post(API_PATHS.logout, {});
};

export const requestPasswordReset = async (payload: IRequestResetPasswordDto): Promise<boolean> => {
  return apiService.put<IRequestResetPasswordDto, boolean>(API_PATHS.resetPassword, payload);
};
