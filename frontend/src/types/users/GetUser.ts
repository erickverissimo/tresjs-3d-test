export interface IGetUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}
