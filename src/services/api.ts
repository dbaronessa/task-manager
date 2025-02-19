import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types/task";

export type Filter = "all" | "active" | "completed";
export type Sort = "name" | "date";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/tasks" }),
  endpoints: (builder) => ({
    getTasks: builder.query<
      Task[],
      { filter?: Filter; sort?: Sort; searchQuery?: string }
    >({
      query: ({ filter, sort, searchQuery }) => {
        const params = new URLSearchParams();
        if (filter && filter !== "all") params.append("filter", filter);
        if (sort) params.append("sort", sort);
        if (searchQuery) params.append("searchQuery", searchQuery);
        return `?${params.toString()}`;
      },
    }),
    createTask: builder.mutation<Task, { title: string }>({
      query: (newTask) => ({
        url: "/",
        method: "POST",
        body: newTask,
      }),
    }),
    updateTask: builder.mutation<
      Task,
      { id: number; title?: string; isCompleted?: boolean }
    >({
      query: ({ id, ...updates }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteTask: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
