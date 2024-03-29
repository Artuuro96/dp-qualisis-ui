export interface InitialState<T> {
  data: T;
  loading?: boolean;
  error?: null | Error;
}
export interface Error {
  message: string[] | string;
}