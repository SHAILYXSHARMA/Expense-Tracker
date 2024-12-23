import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2 } from "lucide-react";
import { setExpenses, setSingleExpense } from "@/redux/expenseSlice";
import axios from "axios";

const UpdateExpense = ({ expense: expenseProp }) => {
    const { expense, singleExpense } = useSelector((store) => store.expense);

    const [formData, setFormData] = useState({
        description: singleExpense?.description || "",
        amount: singleExpense?.amount || "",
        category: singleExpense?.category || "",
    });

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    // Ensure form data updates when singleExpense changes
    useEffect(() => {
        setFormData({
            description: singleExpense?.description || "",
            amount: singleExpense?.amount || "",
            category: singleExpense?.category || "",
        });
    }, [singleExpense]);

    const handleUpdateExpense = async () => {
        try {
            setLoading(true);
            console.log("FormData being sent to API:", formData);
            console.log("Expense ID:", expenseProp._id);
            const res = await axios.put(
                `http://localhost:8000/api/v1/expense/update/${expenseProp._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                // Update expenses in Redux
                const updatedExpenses = expense.map((exp) =>
                    exp._id === expenseProp._id ? res.data.expense : exp
                );
                dispatch(setExpenses(updatedExpenses));
                toast.success(res.data.message || "Expense updated successfully!");
                setIsOpen(false);
            } else {
                toast.error(res.data.message || "Failed to update expense.");
            }
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "An error occurred while updating the expense.";
            console.error(error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    onClick={() => {
                        dispatch(setSingleExpense(expenseProp));
                        setIsOpen(true);
                    }}
                >
                    <Edit2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Expense</DialogTitle>
                    <DialogDescription>
                        Update expense details here. Click "Update" when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label>Amount</Label>
                        <Input
                            type="number"
                            value={formData.amount}
                            onChange={(e) =>
                                setFormData({ ...formData, amount: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label>Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) =>
                                setFormData({ ...formData, category: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="food">Food</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                                <SelectItem value="rent">Rent</SelectItem>
                                <SelectItem value="travel">Travel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button
                    onClick={handleUpdateExpense}
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? "Updating..." : "Update"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateExpense;
