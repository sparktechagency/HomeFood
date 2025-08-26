import { api } from "@/redux/baseApi";

export const CategoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategorys: builder.query<any, any>({
            query: ({ page = 1, perPage = 9999999 }) => `/get-category?per_page=${perPage}&page=${page}`,
        }),

        createCategory: builder.mutation<any, any>({
            query: (formData) => ({
                url: `/create-category`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["category"],
        }),

        deleteCategory: builder.mutation<any, any>({
            query: (id) => ({
                url: `/delete-category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["category"],
        }),


    }),
});

export const { useGetAllCategorysQuery, useCreateCategoryMutation, useDeleteCategoryMutation } = CategoryApi