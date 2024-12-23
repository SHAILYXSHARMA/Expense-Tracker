import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        category: "",
        markAsDone: "",
        expense:[] ,
        singleExpense:null
    },
    reducers: {
        // Actions
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setMarkAsDone: (state, action) => {
            state.markAsDone = action.payload;
        },
        setExpenses:(state,action)=>{
            state.expense=action.payload;
        },
        setSingleExpense:(state,action)=>{
            state.singleExpense=action.payload;
        }
    },
});

// Export actions for dispatching
export const {
    setCategory,
    setMarkAsDone,
    setExpenses,
    setSingleExpense
} = expenseSlice.actions;

// Export the reducer to integrate into the store
export default expenseSlice.reducer;
