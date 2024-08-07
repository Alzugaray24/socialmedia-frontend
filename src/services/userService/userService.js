import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://192.168.1.5:8080/api/user/";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    addImage: builder.mutation({
      query: ({ image, id }) => ({
        url: "addImage",
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
          url: `getImage/${id}`, // Ajusta la URL según la ruta en tu backend
          method: "GET",
        };
      },
      transformResponse: (response) => {
        console.log("Response from server:", response); // Log para depuración
        return response;
      },
    }),
  }),
});

export const { useAddImageMutation, useGetImageByIdQuery } = userApi;