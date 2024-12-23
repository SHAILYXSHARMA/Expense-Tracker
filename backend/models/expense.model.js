import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        done: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense", // Ensure this matches your User model's name
            
        },
    },
    { timestamps: true }
);

// Use default export
const expense = mongoose.model("Expense", expenseSchema);
export default expense;
