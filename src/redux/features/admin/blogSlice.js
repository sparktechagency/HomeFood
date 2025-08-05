const { api } = require("../../baseApi");

const blogSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getallBlogs: builder.query({
      query: () => `blog-list`,
    }),

    createBlog: builder.mutation({
      query: (body) => ({
        url: `blog-add`,
        method: "POST",
        body,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, body }) => ({
        url: `blog-update/${id}`,
        method: "POST",
        body,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blog-delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetallBlogsQuery,
  useLazyGetallBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogSlice;
