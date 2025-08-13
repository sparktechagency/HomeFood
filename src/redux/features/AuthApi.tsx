import { api } from "../baseApi";

const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),

    // register: builder.mutation({
    //   query: (formData) => ({
    //     url: "/register",
    //     method: "POST",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["user"],
    // }),


    register: builder.mutation({
      query: (formData) => {
        console.log('formdataffrom api ', formData);


        return {
          url: "/register",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["user"],
    }),


    // IT WILL TAKE EMAIL TO SEND/RESEND OTP ====================================
    takeEmailForForgetpass: builder.mutation({

      query: (formData) => ({
        url: `/forgot-password`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),


    ///create-new-password

    createNewPass: builder.mutation({

      query: (formData) => ({
        url: `/create-new-password`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),



    // IT WILL TAKE OTP TO VERIFY EMAIL ====================================
    verifyemail: builder.mutation({
      query: (formData) => ({
        url: `/otp-verify`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),






    // GET LOGDIN USER PASSWORD ==============================================
    getOwnprofile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),


    updateProfile: builder.mutation({
      query: (formdata) => ({
        url: `/update-profile`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["user"],
    }),

    updateProfileImage: builder.mutation({
      query: (formdata) => ({
        url: `/update-profile-image`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["user"],
    }),


    changePassword: builder.mutation({
      query: (body) => {
        console.log("changePassword body:", body);
        return {
          url: `/create-new-password`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["user"],
    }),


    createContact: builder.mutation({
      query: (body) => ({
        url: `/contact-form`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),




  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyemailMutation,
  useTakeEmailForForgetpassMutation,
  useGetOwnprofileQuery,
  useUpdateProfileMutation,
  useCreateNewPassMutation,
  useUpdateProfileImageMutation,
  useChangePasswordMutation,
  useCreateContactMutation
} = AuthApi;
