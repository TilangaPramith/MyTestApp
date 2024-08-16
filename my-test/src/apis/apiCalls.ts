import { SigninProps, SignupProps } from '../types/index.types';
import testAppInstance from './header';

export const signInUser = async (info: SigninProps) => {  
  try {
    return Promise.resolve(
      await testAppInstance.post(
        `/auth/login`, info
      )
    )
  } catch (error) {
    return Promise.reject(error);
  }
}

export const registerUser = async (info: SignupProps) => {
  try {
    return Promise.resolve(
      await testAppInstance.post(
        `/auth/signup`, info
      )
    )
  } catch (error) {
    return Promise.reject(error);
  }
}
