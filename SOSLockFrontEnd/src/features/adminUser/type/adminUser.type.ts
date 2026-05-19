export interface AdminProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}
export interface AdminLoginResponse {
  adminUser: AdminProps;
  accessKey: string;
}
