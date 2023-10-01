export interface Api<T> {
  errors: unknown;
  data: null | T;
  statusCode: number;
}
