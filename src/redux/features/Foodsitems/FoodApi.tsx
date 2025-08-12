
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
                min_rating = "",
                max_rating = "",
                sort_by = "",
                perPage = 10,
                page = 1,
            }) =>
                `/get-food?search=${search}&dietary_info=${dietary_info}&pickup_time=${pickup_time}&min_price=${min_price}&max_price=${max_price}&min_rating=${min_rating}&max_rating=${max_rating}&sort_by=${sort_by}&per_page=${perPage}&page=${page}`,

            transformResponse: (response: foodapiResponse) => {
                return response.data.foods;
            },

            providesTags: ["food"],
        }),
    }),
});

export const { useGetAllHomeFoodItemsQuery } = FoodApi;