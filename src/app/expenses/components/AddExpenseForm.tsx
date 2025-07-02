"use client";

import { useState, useEffect } from "react";
import AmountField from "./AmountField";
import TimestampField from "./TimestampField";
import CategoriesField from "./CategoriesField";
import SubmitButton from "./SubmitButton";
import mixpanel from "mixpanel-browser";

interface ExpenseDto {
  amount: number;
  categories: string[];
  timestamp?: string;
}

interface AddExpenseFormProps {
  onExpenseAdded: () => void;
}

export default function AddExpenseForm({ onExpenseAdded }: AddExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize timestamp with current date and time (20-minute intervals)
  useEffect(() => {
    const now = new Date();
    const minutes = Math.floor(now.getMinutes() / 20) * 20;
    now.setMinutes(minutes, 0, 0);
    setTimestamp(now.toISOString().slice(0, 16));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: amount > 0 and at least one category
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    if (selectedCategories.length === 0) {
      alert("Please select at least one category");
      return;
    }

    setIsSubmitting(true);

    try {
      const time = new Date(timestamp);
      const timeInSeconds = Math.floor(time.getTime() / 1000);

      const expenseData: ExpenseDto = {
        amount: parseFloat(amount),
        categories: selectedCategories,
        timestamp: timestamp,
      };

      const response = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        // Reset form
        setAmount("");
        setSelectedCategories([]);
        
        // Notify parent component
        onExpenseAdded();

        const { id } = (await response.json()) as { id: string };

        mixpanel.track("ExpenseAdded", {
          id,
          amount: parseFloat(amount),
          categories: selectedCategories,
          isDebug: process.env.NEXT_PUBLIC_IS_DEBUG === "true",
          $time: timeInSeconds,
          time: timeInSeconds,
        });

        alert("Expense added successfully!");
      } else {
        throw new Error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        color: 'var(--text-dark)'
      }}>
        Add Expense
      </h2>

      <form onSubmit={handleSubmit}>
        <AmountField 
          amount={amount} 
          onAmountChange={setAmount} 
        />
        
        <TimestampField 
          timestamp={timestamp} 
          onTimestampChange={setTimestamp} 
        />
        
        <CategoriesField 
          selectedCategories={selectedCategories} 
          onCategoriesChange={setSelectedCategories} 
        />
        
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
} 