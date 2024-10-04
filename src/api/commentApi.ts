import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IComments } from '../models/IComments';

export const commentApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getComments: builder.query<IComments[], string>({
      query: () => ({
        url: '/comments',
      }),
      providesTags: ['Post'],
    }),

    addComment: builder.mutation({
      query: (newComment) => ({
        url: '/comments',
        method: 'POST',
        body: newComment,
      }),
      invalidatesTags: ['Post'],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),

    likeComment: builder.mutation({
      query: ({ id, like }) => ({
        url: `/comments/${id}/like`,
        method: 'POST',
        body: { like, id },
      }),
      invalidatesTags: ['Post'],
    }),
    dislikeComment: builder.mutation({
      query: ({ id, dislike }) => ({
        url: `/comments/${id}/dislike`,
        method: 'POST',
        body: { dislike, id },
      }),
      invalidatesTags: ['Post'],
    }),
    replyComment: builder.mutation({
      query: ({ parentId, content, username, avatar, userId }) => ({
        url: `/comments/${parentId}/reply`,
        method: 'POST',
        body: { parentId, content, username, avatar, userId },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useDislikeCommentMutation,
  useReplyCommentMutation,
} = commentApi;
