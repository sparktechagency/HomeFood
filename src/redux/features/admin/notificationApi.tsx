import { api } from "@/redux/baseApi";

export const Notification = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<any, any>({
      query: ({ page = 1, perPage = 8 }) => `/get-notification?per_page=${perPage}&page=${page}`,
      providesTags: ["notification"],
    }),


    markAsRead: builder.mutation<any, any>({
      query: (id) => ({
        url: `/notifications-read/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),



    markAllAsRead: builder.mutation<any, any>({
      query: () => ({
        url: `/notifications-read-all`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),


  }),
});

export const { useGetAllNotificationsQuery, useMarkAsReadMutation, useMarkAllAsReadMutation, } = Notification