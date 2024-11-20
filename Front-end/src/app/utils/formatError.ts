import { FormattedErrorArray, FormattedError } from "@/types/Errors";

const isErrorObject = (error: any): error is FormattedError => {
  return (
    error &&
    typeof error == "object" &&
    "message" in error &&
    typeof error.message == "string"
  );
};

const isErrorArray = (error: any): error is FormattedErrorArray => {
  return (
    Array.isArray(error) &&
    "message" in error[0] &&
    typeof error[0].message == "string"
  );
};

export default function formatError(error: any) {
  if (isErrorArray(error)) {
    return {
      message: error[0].message,
    };
  } else if (isErrorObject(error)) {
    return { message: error.message };
  }

  return { message: error.message };
}
