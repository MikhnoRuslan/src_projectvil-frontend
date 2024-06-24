export interface IAuthModel {
  email: string;
  password: string;
}

export interface IAuthorizationDto {
  accessToken: string,
  refreshToken: string
}
