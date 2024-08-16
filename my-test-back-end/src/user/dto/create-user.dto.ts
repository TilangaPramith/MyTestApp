export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly refreshToken?: string;
  // readonly access_token?: string
}
