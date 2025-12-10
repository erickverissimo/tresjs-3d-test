export interface UpdateRoleDTO {
  id: string;
  name?: string;
  description: string;
  permissionsIds: string[];
}
