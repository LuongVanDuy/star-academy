export type ListResponse = {
  data: any[];
  total: number;
  error?: boolean;
  message?: string;
};

export type DetailResponse = {
  data: {};
  error?: boolean;
  message?: string;
};

export type CreateResponse = {
  success: boolean;
  id?: string;
  error?: boolean;
  message?: string;
};

export type UpdateResponse = {
  success: boolean;
  id?: string;
  error?: boolean;
  message?: string;
};

export type DeleteResponse = {
  success: boolean;
  id?: string;
  error?: boolean;
  message?: string;
};

export type CheckResponse = {
  success: boolean;
};
