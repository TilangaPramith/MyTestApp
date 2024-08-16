export interface ToggelProps {
  isOn: boolean;
  setIsOn: (e: boolean) => void
}

export interface UserStateProps {
  name: string,
  isRegistered: boolean,
  isLogged: boolean,
  isLoading: boolean,
}

export interface SigninProps {
  email: string,
  password: string
}

export interface SignupProps {
  email: string,
  name: string,
  password: string
}