export interface LoginResponse {
  userId: any,
  message: string,
  accessToken?: string,
  refreshToken?: string,
}