
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
                sort_by = "",
                page = 1,
            }) =>
                `/get-food?search=${search}&dietary_info=${dietary_info}&pickup_time=${pickup_time}&min_price=${min_price}&max_price=${max_price}&sort_by=${sort_by}&per_page=10&page=${page}`,

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
    }),
});

export const { useGetAllHomeFoodItemsQuery, useRequestForAfoodMutation } = FoodApi;