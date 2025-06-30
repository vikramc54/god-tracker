"use client";

import { useState } from "react";
import TotalSpending from "./components/TotalSpending";
import AddExpenseForm from "./components/AddExpenseForm";

export default function ExpensesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleExpenseAdded = () => {
    // Trigger a refresh of the total spending by updating the key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: 'var(--text-dark)'
        }}>
          Expenses
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-light)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Track your spending habits and manage your finances effectively.
        </p>
      </div>

      {/* Total Spending Section */}
      <TotalSpending 
        key={refreshKey}
        onMonthYearChange={() => {}} 
      />

      {/* Add Expense Section */}
      <AddExpenseForm onExpenseAdded={handleExpenseAdded} />
    </div>
  );
}
