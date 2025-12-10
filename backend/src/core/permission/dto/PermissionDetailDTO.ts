export interface PermissionDetailDTO {
  id: string;
  resource: string;
  action: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
