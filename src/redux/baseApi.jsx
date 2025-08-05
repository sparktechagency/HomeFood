import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// 1. You are importing the 'Cookies' class correctly
import Cookies from "js-cookie";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://103.186.20.110:8123/api",
    prepareHeaders: (headers) => {
      // 3. Use the 'cookies' instance to call the .get() method
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", `*/*`);
        headers.set("Access-Control-Allow-Origin", `*/*`);
      }
      return headers;
    },
  }),
  tagTypes: ["user", "blog", "faq", "about", "notification"],
  endpoints: () => ({}),
});

export const imageUrl = "http://103.186.20.110:8123/";
