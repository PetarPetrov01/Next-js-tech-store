import { ProductQueryParams } from "../../types/Product";
import { useSearchParams } from "next/navigation";

export const parseSearchParams = (params: ReturnType<typeof useSearchParams>): ProductQueryParams => {
    const [priceGte, priceLte] = params.get("price")?.split(':') || [];
  
    const [sortKey, sortOrder] = params.get("sort")?.split(':') || [];
  
    return {
      search: params.get("search") || undefined,
      category: params.get("category") ? Number(params.get("category")) : undefined,
      brand: params.get("brand") ? Number(params.get("brand")) : undefined,
      price: {
        gte: priceGte ? Number(priceGte) : undefined,
        lte: priceLte ? Number(priceLte) : undefined,
      },
      sort: sortKey && sortOrder
        ? {
            key: sortKey,
            order: sortOrder as "asc" | "desc",
          }
        : undefined,
    };
  };