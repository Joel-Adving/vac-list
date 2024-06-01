import { FullProfileType, SuspectType } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseUrl =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_BASE_URL_DEV : process.env.NEXT_PUBLIC_BASE_URL_PROD

// Define a service using a base URL and expected endpoints
export const nextApi = createApi({
  reducerPath: 'nextApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSuspects: builder.query<SuspectType[], void>({
      query: () => `/api/suspects`
    }),
    getFullProfiles: builder.query<FullProfileType[], void>({
      query: () => `/api/full-profiles`
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSuspectsQuery, useGetFullProfilesQuery } = nextApi
