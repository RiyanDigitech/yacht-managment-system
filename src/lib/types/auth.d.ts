export interface LoginApiResponse {
  data: {
    success: boolean;
    message: string;
    data: {
      access_token: string;
      user: {
        id: number;
        name: string;
        email: string;
        role: string;
      };
    };
  };
}
export interface userType {
  email: string;
  password: string;
}
export type InputsForgotPassword = z.infer<typeof schemaForgotPassword>;
export interface ForgotEmailType {
  email: string;
}
export interface ForgotEmailResponse {
  message: string;
}
export interface userDataType {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
}
