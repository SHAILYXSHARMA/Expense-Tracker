import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import expenseSlice from "./expenseSlice.js";



const store = configureStore({
    reducer:{
        auth: authSlice,
        expense:expenseSlice
    }
})
export default store;