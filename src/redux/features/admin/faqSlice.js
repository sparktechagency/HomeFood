const { api } = require("../../baseApi");

const faqSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => `faq`,
    }),
    createFaq: builder.mutation({
      query: (body) => ({
        url: `faq-add`,
        method: "POST",
        body,
      }),
    }),
    updateFaq: builder.mutation({
      query: (body) => ({
        url: `faq-update/${body.id}`,
        method: "POST",
        body,
      }),
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `faq-delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqSlice;
