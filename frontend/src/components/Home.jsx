import React from "react";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import "./style.css"; // Importing the CSS file
import { useDispatch } from "react-redux";
import { setCategory, setMarkAsDone } from "@/redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "@/hooks/useGetExpenses";


const Home = () => {
  useGetExpenses();
  const dispatch = useDispatch();

  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
    console.log("Selected category:", value);
  };
  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
    console.log("Selected category:", value);
  };

  return (
    <div className="body">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          {/* Left-aligned Title */}
          <h1 className="text-3xl font-bold">Expense Tracker</h1>

          {/* Right-aligned Button */}
          <div>
            <CreateExpense />
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium">Filter By:</h2>
          <Select onValueChange={changeCategoryHandler}>
            <SelectTrigger className="w-[200px] border border-gray-300 shadow-md">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={changeDoneHandler}>
            <SelectTrigger className="w-[200px] border border-gray-300 shadow-md">
              <SelectValue placeholder="Mark As" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
                <SelectItem value="both">Both</SelectItem>

              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ExpenseTable />
      </div>
    </div>
  );
};

export default Home;
