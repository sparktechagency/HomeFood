const { api } = require("../../baseApi");

const aboutSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => `aboutList`,
    }),
    createAbout: builder.mutation({
      query: (body) => ({
        url: `about-add`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAboutQuery, useCreateAboutMutation } = aboutSlice;
