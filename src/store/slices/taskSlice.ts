import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";
import axios from "axios";

export type Filter = "all" | "active" | "completed";
export type Sort = "name" | "date";
export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface TaskState {
  tasks: Task[];
  filter: Filter;
  sort: Sort;
  searchQuery: string;
  isModalOpen: boolean;
  selectedTask: Task | null;
  status: Status;
  error: string | undefined;
}

const initialState: TaskState = {
  tasks: [],
  filter: "all",
  sort: "date",
  searchQuery: "",
  isModalOpen: false,
  selectedTask: null,
  status: "idle",
  error: undefined,
};

export const fetchTasks = createAsyncThunk<Task[], void>(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get<Task[]>("http://localhost:3000/tasks");
    return response.data;
  }
);

// createAsyncThunk

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload,
        isCompleted: false,
      });
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    updateTaskTitle: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    changeFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },

    changeSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    openModal: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.selectedTask = null;
      state.isModalOpen = false;
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTaskStatus,
  updateTaskTitle,
  changeSort,
  setSearchQuery,
  openModal,
  closeModal,
  changeFilter,
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectFilter = (state: RootState) => state.tasks.filter;
export const selectSort = (state: RootState) => state.tasks.sort;
export const selectSearchQuery = (state: RootState) => state.tasks.searchQuery;
export const selectIsModalOpen = (state: RootState) => state.tasks.isModalOpen;
export const selectSelectedTask = (state: RootState) =>
  state.tasks.selectedTask;

export const selectProcessedTasks = (state: RootState) => {
  const { tasks, filter, searchQuery, sort } = state.tasks;

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.isCompleted);
  } else if (filter === "active") {
    filteredTasks = filteredTasks.filter((task) => !task.isCompleted);
  }

  if (searchQuery.trim() !== "") {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return [...filteredTasks].sort((a, b) => {
    if (sort === "name") return a.title.localeCompare(b.title);
    if (sort === "date") return a.id - b.id;
    return 0;
  });
};

export default taskSlice.reducer;
