import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const apiSlice = createApi({
    reducerPath: 'api',
    /* baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }), */

    // Axios tabanlı baseQuery kullanılıyor
    baseQuery: axiosBaseQuery(),

    // Önbellekte saklanacak veri türleri için "tag" adları belirliyoruz
    tagTypes: ['users'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            /* query: () => '/users', */
            query: () => ({
                url: '/users/',
                method: 'Get',
            }),
            // Bu sorgunun sağladığı veriyi 'users' etiketiyle işaretliyoruz
            // Böylece, 'users' etiketi geçersiz kılındığında bu veri yeniden çekilecek
            providesTags: ['users'],
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body,
            }),
            // Bu mutasyon 'users' etiketini geçersiz kılar (invalidate),
            // Böylece kullanıcılar listesi yeniden çekilir ve güncel veriyi gösterir
            invalidatesTags: ['users'],
        }),
    }),
});

export const { useGetUsersQuery, useCreateUserMutation } = apiSlice;

// export const { use/* EndpointName */Query } = apiSlice;
// export const { /* EndpointName */ } = apiSlice.endpoints;
