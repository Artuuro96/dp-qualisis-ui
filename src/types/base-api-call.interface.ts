export interface BaseApiCall {
  onStart: string;
  onSuccess: string;
  onError: string;
  url: string;
  headers?: {
    Authorization: string,
  }
  method?: string;
}