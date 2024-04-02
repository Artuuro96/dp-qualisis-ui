export interface Response<T> {
  result: T,
  total: number;
  page: number;
  pages: number;
  perPage: number;
}