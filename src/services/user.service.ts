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
