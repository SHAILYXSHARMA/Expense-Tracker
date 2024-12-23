// Import the Expense model
import Expense from "../models/expense.model.js";

export const addExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const userId = req.id; // Current logged-in user ID

        if (!description || !amount || !category) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            })
        };

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId,
        });

        return res.status(201).json({
            message: "New expense added.",
            expense,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while adding expense.",
            success: false,
        });
    }
};

export const getAllExpense = async (req, res) => {
    try {
        const userId = req.id; // Logged-in user ID
        const category = req.query.category || "";
        const done = req.query.done || "";

        const query = { userId }; // Filter by user ID

        if (category.toLowerCase() !== "all") {
            query.category = { $regex: category, $options: "i" }; // Case-insensitive category filter
        }

        if (done.toLowerCase() === "done") {
            query.done = true;
        } else if (done.toLowerCase() === "undone") {
            query.done = false; // Filter for pending expenses
        }

        const expenses = await Expense.find(query);

        if (!expenses || expenses.length === 0) {
            return res.status(404).json({
                message: "No expenses found.",
                success: false,
            });
        }

        return res.status(200).json({
            expenses,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while fetching expenses.",
            success: false,
        });
    }
};

export const markAsDoneUndone = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { done } = req.body;

        const expense = await Expense.findByIdAndUpdate(
            expenseId,
            { done },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: `Expense marked as ${expense.done ? "done" : "undone"}.`,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while updating expense status.",
            success: false,
        });
    }
};

export const removeExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        const expense = await Expense.findByIdAndDelete(expenseId);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Expense removed.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while removing expense.",
            success: false,
        });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const expenseId = req.params.id;

        const updateData = { description, amount, category };

        const expense = await Expense.findByIdAndUpdate(expenseId, updateData, {
            new: true
        });


        return res.status(200).json({
            message: "Expense updated.",
            expense,
            success: true
        })
    } catch (error) {
        console.error(error);
        }
    }
