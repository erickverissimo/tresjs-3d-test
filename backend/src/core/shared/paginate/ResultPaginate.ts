export class ResultPaginate<T = any> {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly itensPerPage: number;
  readonly totalItems: number;
  readonly totalItemsPage: number;
  readonly result: T[];

  constructor(page: number, limit: number, count: number, result: T[]) {
    this.currentPage = page + 1;
    this.itensPerPage = limit;
    this.totalItems = count;
    this.totalPages = Math.ceil(count / limit);
    this.totalItemsPage = result.length;
    this.result = result;
  }

  map<NewType>(mapFn: (item: T) => NewType): ResultPaginate<NewType> {
    const result = this.result.map(mapFn);
    return new ResultPaginate<NewType>(
      this.currentPage - 1,
      this.itensPerPage,
      this.totalItems,
      result
    );
  }
}
