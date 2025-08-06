import { api } from "@/redux/baseApi";

export const SellerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllPendingRequests: builder.query<any, any>({
            query: ({ page = 1, perPage = 8 }) => `/get-order?page=${page}&per_page=${perPage}`,
        }),

        getAllFoodItems: builder.query<any, any>({
            query: ({ page = 1, per_page = 8 }) => `/get-food?per_page=${per_page}&page=${page}`,
            providesTags: ["food"],
        }),

        getsellerFooditems: builder.query<any, any>({
            query: ({ page = 1, perPage = 8 }) => `/seller-food?per_page=${perPage}&page=${page}`,
            providesTags: ["food"],
        }),

        getrequestedFoodItems: builder.query<any, any>({
            query: ({ page = 1, perPage = 8 }) => `/get-user-food-request?per_page=${perPage}&page=${page}`,
        }),

        getOrderHistory: builder.query<any, any>({
            query: ({ page = 1, perPage = 8 }) => `/order-history?per_page=${perPage}&page=${page}`,
        }),
        getDashboard: builder.query<any, any>({
            query: () => `/dashboard`,
        }),

        deleteFoodItem: builder.mutation<any, any>({
            query: (id) => ({
                url: `/delete-food/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["food"],
        }),


        activeOrDeactiveItem: builder.mutation<any, any>({
            query: ({ foodId, statusId }) => ({
                url: `/food-status/${foodId}?status=${statusId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["food"],
        }),

    }),
});

export const { useGetAllPendingRequestsQuery, useGetAllFoodItemsQuery, useGetrequestedFoodItemsQuery, useGetOrderHistoryQuery, useGetDashboardQuery, useGetsellerFooditemsQuery, useDeleteFoodItemMutation, useActiveOrDeactiveItemMutation } = SellerApi;