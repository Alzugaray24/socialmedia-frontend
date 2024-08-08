import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://192.168.1.5:8080/api/user/";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    addProfileImg: builder.mutation({
      query: ({ image, id }) => ({
        url: "addProfileImg",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, id }),
      }),
    }),
    getImageById: builder.query({
      query: (id) => {
        return {
          url: `getImage/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        console.log("Response from server:", response);
        return response;
      },
    }),
  }),
});

export const { useAddProfileImgMutation, useGetImageByIdQuery } = userApi;
