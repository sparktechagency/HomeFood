import { api } from "@/redux/baseApi";

export const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<any, any>({
      query: () => `/dashboard`,
    }),

    getbyers: builder.query<any, any>({
      query: ({ page = 1, perPage = 8, search = "" }) => `/get-buyer?search=${search}&per_page=${perPage}&page=${page}`,
      providesTags: ["user"],
    }),
    DeleteBuyer: builder.mutation<any, any>({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    getSelers: builder.query<any, any>({
      query: ({ page = 1, perPage = 8, search }) => `/get-seller?search=${search}&per_page=${perPage}&page=${page}`,
      providesTags: ["user"],
    }),

    DeleteSeller: builder.mutation<any, any>({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),


    getAllFaq: builder.query<any, any>({
      query: () => `/faq`,
      providesTags: ["faq"],
    }),

    CreateFaq: builder.mutation<any, any>({
      query: (body) => ({
        url: `/create-faq`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["faq"],
    }),




    getAbout: builder.query<any, any>({
      query: () => `/about-us`,
      providesTags: ["about"],
    }),

    createAbout: builder.mutation<any, any>({
      query: (body) => ({
        url: `/create-about-us`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["about"],
    }),



    getPrivacy: builder.query<any, any>({
      query: () => `/privacy-policy`,
      providesTags: ["privacy"],
    }),

    createPrivacy: builder.mutation<any, any>({
      query: (body) => ({
        url: `/create-privacy-policy`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["privacy"],
    }),


    getoverview: builder.query<any, any>({
      query: () => `/admin-dashbaord`,
      providesTags: ["overview"],
    }),



    createContent: builder.mutation<any, any>({
      query: (body) => ({
        url: `/manage-content`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["content"],
    }),

    getContent: builder.query<any, any>({
      query: ({ type }) => `/get-content?content_type=${type}`,
      providesTags: ["content"],
    })







  }),
});


export const { useGetDashboardQuery, useGetbyersQuery, useDeleteBuyerMutation, useGetSelersQuery, useDeleteSellerMutation, useGetAllFaqQuery, useCreateFaqMutation, useGetAboutQuery, useCreateAboutMutation, useGetPrivacyQuery, useCreatePrivacyMutation, useGetoverviewQuery, useCreateContentMutation, useGetContentQuery } = dashboardSlice;