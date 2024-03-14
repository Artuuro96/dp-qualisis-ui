export type Action<S, T> = {
  type: S;
  payload: T;
}