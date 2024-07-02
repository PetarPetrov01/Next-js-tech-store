export type ErrorsState = {
    errors?: {
      email?: string[];
      password?: string[];
    };
    message?: null | string;
  };