export interface IPaginateResponse<T> {
  currentPage: number;
  totalPages: number;
  itensPerPage: number;
  totalItems: number;
  totalItemsPage: number;
  result: T[];
}
