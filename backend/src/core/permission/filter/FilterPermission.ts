export interface FilterPermission {
  id?: string | null;
  idNotEquals?: string | null;
  resource?: string | null;
  action?: string | null;
  description?: string | null;
  descriptionLike?: string | null;
  resources?: string[] | null;
}
