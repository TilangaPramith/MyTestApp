import { registerUser, signInUser } from "../../apis/apiCalls";
import { SigninProps, SignupProps } from "../../types/index.types";
import { setIsLoading, setIsLogged, setIsRegistered, setName } from "./userSlice";

export const userSignInAsync = (info: SigninProps): any => {
  return async(dispatch: any) => {
    try {
      
      const response = await signInUser(info);      
      if (response?.status !== 200 && response?.status !== 201) {
        throw new Error();
      }
      dispatch(setName(response?.data?.name));
      localStorage.setItem('accessToken', response?.data?.accessToken);
      localStorage.setItem('refreshToken', response?.data?.refreshToken);
      dispatch(setIsLogged(true));
      alert('Login successfully!')
    } catch (error) {
      dispatch(setIsLogged(false));
      alert("User login failed! Try again")
    } finally {
      dispatch(setIsLoading(false))
    }
  } 
}

export const userSignUpAsync = (info: SignupProps): any => {
  return async(dispatch: any) => {
    try {
      const response = await registerUser(info);
      if (response.status !== 201) {
        throw new Error();
      }
      dispatch(setIsRegistered(true));
      alert("User registration successfully!")
    } catch (error) {
      dispatch(setIsRegistered(false));
      alert("User registration falied! Try again")
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  
}