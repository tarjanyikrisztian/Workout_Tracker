import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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
            return await exerciseService.getExercises();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
    }
});

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        reset: (state) => {initialState},
    },
    extraReducers: (builder) => {
        builder
            .addCase(createExercise.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createExercise.fulfilled, (state, action) => {
                state.isLoading = false;
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
            })
            .addCase(getExercises.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.exercises = action.payload;
            })
            .addCase(getExercises.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })

    },
});

export const {reset} = exerciseSlice.actions;
export default exerciseSlice.reducer;