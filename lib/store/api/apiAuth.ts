import { HOST } from "@/lib/constanta";
import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiAuth = createApi({
    reducerPath: 'apiAuth',
    baseQuery: fetchBaseQuery({ baseUrl: HOST }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'api/login',
                method: 'POST',
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: 'api/register',
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = apiAuth