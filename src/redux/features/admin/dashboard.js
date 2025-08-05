const { api } = require("../../baseApi");

const statisticsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: (filter) => ({
        url: `/statistics?period=${filter}`,
        method: "GET",
      }),
    }),

    getAnalytics: builder.query({
      query: (filter) => ({
        url: `/analytics?filter=${filter}`,
        method: "GET",
      }),
    }),

    getMostEarning: builder.query({
      query: (year) => ({
        url: `/most-earning`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetStatisticsQuery,
  useGetAnalyticsQuery,
  useGetMostEarningQuery,
} = statisticsSlice;
