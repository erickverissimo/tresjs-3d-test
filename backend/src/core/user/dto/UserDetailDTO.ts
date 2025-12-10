export interface UserDetailDTO {
  id: string;
  name: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
}
