export interface FetchResponseInterface<T> {
  message: string;
  toastMessage?: string;
  data: T;
}
