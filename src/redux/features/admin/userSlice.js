const { api } = require("../../baseApi");

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, perPage, search }) =>
        `users?page=${page}&per_page=${perPage}&search=${search}`,
      providesTags: ["user"],
    }),

    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useDeleteUsersMutation, useGetAllUsersQuery } = userSlice;
