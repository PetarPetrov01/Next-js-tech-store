export type ErrorsState = {
    errors?: {
      email?: string[];
      password?: string[];
    };
    message?: null | string;
  };

  export interface FormattedError {
    message: string;
  }
  
  export type FormattedErrorArray = Error[];