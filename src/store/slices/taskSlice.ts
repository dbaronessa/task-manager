// src/store/slices/taskSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../store.ts";

export type Filter = 'all' | 'active' | 'completed';
export type Sort = 'name' | 'date';

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
}

const initialState: TaskState = {
    tasks: [],
    filter: 'all',
    sort: 'date',
    searchQuery: '',
    isModalOpen: false,
    selectedTask: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload,
                isCompleted: false,
            });
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        updateTaskStatus: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.isCompleted = !task.isCompleted;
            }
        },
        updateTaskTitle: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
            }
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            if(action.payload === 'completed') state.tasks.filter((task) => task.isCompleted)
            if(action.payload === 'active') state.tasks.filter((task) => !task.isCompleted)
        },

        setSort: (state, action: PayloadAction<Sort>) => {
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
    setFilter,
    setSort,
    setSearchQuery,
    openModal,
    closeModal,
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectFilter = (state: RootState) => state.tasks.filter;
export const selectSort = (state: RootState) => state.tasks.sort;
export const selectSearchQuery = (state: RootState) => state.tasks.searchQuery;
export const selectIsModalOpen = (state: RootState) => state.tasks.isModalOpen;
export const selectSelectedTask = (state: RootState) => state.tasks.selectedTask;

export default taskSlice.reducer;
