export interface UserLoginResponse {
  userId: string;
  accessKey: string;
}

export interface SignUpUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface SignUpUserResponse {
  id: string;
  email: string;
}