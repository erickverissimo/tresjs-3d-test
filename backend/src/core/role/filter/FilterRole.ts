export interface FilterRole {
  id?: string | null;
  idNotEquals?: string | null;
  name?: string | null;
  nameLike?: string | null;
  companyId?: string | null;
  vendorId?: string | null;
  systemRole?: boolean;
}
