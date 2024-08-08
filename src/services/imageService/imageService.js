import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://192.168.1.5:8080/api/images";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    addImage: builder.mutation({
      query: ({ image, id }) => ({
        url: "addImage",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, id }),
      }),
    }),

    getAllUserImages: builder.query({
      query: (id) => ({
        url: `getAllUserImages/${id}`, // Añade el id a la URL
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useAddImageMutation, useGetAllUserImagesQuery } = imageApi;
