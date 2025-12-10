export interface CreateUserDTO {
  name: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  password?: string | null;
}
