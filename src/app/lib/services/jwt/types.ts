export type CurrentUserResult = {
  id: string;
  name: string;
  email: string;
};
export type LoginReponse = {
  accessToken: string;
  refreshToken: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest;
