export interface InitialState<T> {
  data: T;
  loading?: boolean;
  error?: null | string;
}