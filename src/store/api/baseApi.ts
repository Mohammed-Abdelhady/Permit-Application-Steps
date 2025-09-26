import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define base URL - you can change this to your API endpoint
const BASE_URL = "https://jsonplaceholder.typicode.com";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // Add authentication token if available
            // const token = localStorage.getItem('token');
            // if (token) {
            //   headers.set('authorization', `Bearer ${token}`);
            // }

            headers.set("content-type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Permit"],
    endpoints: () => ({}),
});
