import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import exerciseService from './exerciseService';

const initialState = {
    exercises: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const createExercise = createAsyncThunk(
    'exercise/createExercise',
    async (exerciseData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await exerciseService.createExercise(exerciseData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const getExercises = createAsyncThunk(
    'exercise/fetchExercises',
    async (thunkAPI) => {
        try {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem('user')).token
                return await exerciseService.getExercises(token)
            } else {
                return await exerciseService.getExercises(null)
            }
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    });

export const updateExercise = createAsyncThunk(
    'exercise/updateExercise',
    async (exerciseData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await exerciseService.updateExercise(exerciseData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    });

export const deleteExercise = createAsyncThunk(
    'exercise/deleteExercise',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await exerciseService.deleteExercise(id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    });

export const likeExercise = createAsyncThunk(
    'exercise/likeExercise',
    async (exerciseId, thunkAPI) => {
        try {
            const id = thunkAPI.getState().auth.user._id
            return await exerciseService.likeExercise(exerciseId, id)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    });

export const dislikeExercise = createAsyncThunk(
    'exercise/dislikeExercise',
    async (exerciseId, thunkAPI) => {
        try {
            const id = thunkAPI.getState().auth.user._id
            return await exerciseService.dislikeExercise(exerciseId, id)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    });

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        reset: (state) => { initialState },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createExercise.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(createExercise.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.exercises.push(action.payload.exercise);
            })
            .addCase(createExercise.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getExercises.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getExercises.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.exercises = action.payload;
            })
            .addCase(getExercises.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(likeExercise.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(likeExercise.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.exercises = state.exercises.map((exercise) => {
                    if (exercise._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return exercise;
                    }
                });
            })
            .addCase(likeExercise.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(dislikeExercise.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(dislikeExercise.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.exercises = state.exercises.map((exercise) => {
                    if (exercise._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return exercise;
                    }
                });
            })
            .addCase(dislikeExercise.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(updateExercise.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateExercise.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.exercises = state.exercises.map((exercise) => {
                    if (exercise._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return exercise;
                    }
                });
            })
            .addCase(updateExercise.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(deleteExercise.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(deleteExercise.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.exercises = state.exercises.filter((exercise) => exercise._id !== action.payload._id);
            })
            .addCase(deleteExercise.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    },
});

export const { reset } = exerciseSlice.actions;
export default exerciseSlice.reducer;