
import { FilterParams, foodapiResponse, PaginatedFoods } from "@/lib/types/api";
import { api } from "@/redux/baseApi";


export const FoodApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllHomeFoodItems: builder.query<PaginatedFoods, FilterParams>({
            query: ({
                search = "",
                dietary_info = "",
                pickup_time = "",
                min_price = "",
                max_price = "",
                rating = "",
                sort_by = "",
                page = 1,
                listing_by_buyer,
                listing_by_seller,
                delivery_time = ""
            }) =>
                `/get-food?search=${search}&dietary_info=${dietary_info}&pickup_time=${pickup_time}&listing_by_seller=${listing_by_seller}&listing_by_buyer=${listing_by_buyer}&min_price=${min_price}&max_price=${max_price}&delivery_time=${delivery_time}&rating=${rating}&sort_by=${sort_by}&per_page=4&page=${page}`,

            transformResponse: (response: foodapiResponse) => {
                return response.data.foods;
            },

            providesTags: ["food"],
        }),


        requestForAfood: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/food-request/${id}`,
                method: "POST",
                body,
            }),
        }),


        orderFood: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/order/${id}`,
                method: "POST",
                body,
            }),
        })
    }),
});

export const { useGetAllHomeFoodItemsQuery, useRequestForAfoodMutation, useOrderFoodMutation } = FoodApi;