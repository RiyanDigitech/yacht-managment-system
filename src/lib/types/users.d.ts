export interface UserData {

  name: string;
  email:string;
  phone:string;
  password:string;
  password_confirmation:string;
  role:string;

}

export type CreateUserResponse = {
  message: string;
  data?: UserData;
};
