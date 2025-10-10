import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/auth/`,
  }),
  endpoints: (builder) => ({
    googleSignIn: builder.mutation({
      query: (data) => ({
        url: "google-login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const getUser = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/user/${id}`);
  return data;
};

export const { useGoogleSignInMutation } = authApi;
