import { headers } from "next/headers";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export type ResponseInterceptor<T = any> = (
  response: Response,
  data: T
) => T | Promise<T>;

class CustomFetch {
  private responseInterceptors = new Set<ResponseInterceptor>();

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.add(interceptor);
  }

  removeResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.delete(interceptor);
  }

  async interceptedFetch<T = any>(url: string, options: FetchOptions) {
    const defaultOptions: FetchOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers: options.headers,
    };

    try {
      const res = await fetch(url, finalOptions);

      let data: T;

      try {
        data = await res.json();
      } catch (error) {
        //in case data is not json
        data = (await res.text()) as unknown as T;
      }

      console.log(this.responseInterceptors)

      for (const interceptor of Array.from(this.responseInterceptors)) {
        data = await interceptor(res, data);
      }

      return data;
    } catch (error) {
      console.log("Error in custom client!");
      throw error;
    }
  }
}

export const customFetch = new CustomFetch();
