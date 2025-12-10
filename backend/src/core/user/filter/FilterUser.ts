export interface FilterUser {
  id?: string | null;
  idNotEquals?: string | null;
  name?: string | null;
  nameLike?: string | null;
  email?: string | null;
  emailNotEquals?: string | null;
  phone?: string | null;
  role?: string | null;
  searchFilter?: string | null;
}
