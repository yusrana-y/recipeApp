import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from './slices/recipeSlice'

const store = configureStore({
    reducer:{
        recipeReducer:recipeSlice
    }
})

export default store
