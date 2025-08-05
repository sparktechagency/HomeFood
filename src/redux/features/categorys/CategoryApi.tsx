import { api } from "@/redux/baseApi";

export const CategoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategorys: builder.query<any, any>({
            query: ({ page = 1, perPage = 8 }) => `/get-category?per_page=${perPage}&page=${page}`,
        })
    }),
});

export const { useGetAllCategorysQuery } = CategoryApi