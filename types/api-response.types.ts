export type ApiResponse = {
  type: 'error' | 'success';
  status?: number;
  message?: string;
};