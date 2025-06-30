"use client";

import { useState, useEffect } from "react";

interface TotalSpendingProps {
  onMonthYearChange: (month: number, year: number) => void;
}

interface TotalSpendingData {
  month: number;
  year: number;
  total: number;
}

export default function TotalSpending({ onMonthYearChange }: TotalSpendingProps) {
  const [totalSpending, setTotalSpending] = useState<TotalSpendingData | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    fetchTotalSpending(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const fetchTotalSpending = async (month: number, year: number) => {
    try {
      const response = await fetch(`/api/expense/total?month=${month}&year=${year}`);
      if (response.ok) {
        const total = await response.json();
        setTotalSpending({ month, year, total });
        onMonthYearChange(month, year);
      }
    } catch (error) {
      console.error("Error fetching total spending:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMonthName = (month: number) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month - 1];
  };

  const months = [
    { value: 1, label: "January" }, { value: 2, label: "February" },
    { value: 3, label: "March" }, { value: 4, label: "April" },
    { value: 5, label: "May" }, { value: 6, label: "June" },
    { value: 7, label: "July" }, { value: 8, label: "August" },
    { value: 9, label: "September" }, { value: 10, label: "October" },
    { value: 11, label: "November" }, { value: 12, label: "December" }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: 'var(--text-dark)'
      }}>
        Total Spending
      </h2>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ minWidth: '150px' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: 'var(--text-dark)',
            fontSize: '0.875rem'
          }}>
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid var(--gray-200)',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              backgroundColor: 'var(--white)',
              color: 'var(--text-dark)'
            }}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ minWidth: '120px' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: 'var(--text-dark)',
            fontSize: '0.875rem'
          }}>
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid var(--gray-200)',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              backgroundColor: 'var(--white)',
              color: 'var(--text-dark)'
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {totalSpending ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--primary-blue)'
          }}>
            {formatCurrency(totalSpending.total)}
          </div>
          <div style={{
            color: 'var(--text-light)',
            fontSize: '1.125rem'
          }}>
            for {getMonthName(totalSpending.month)} {totalSpending.year}
          </div>
        </div>
      ) : (
        <div style={{ color: 'var(--text-light)' }}>Loading...</div>
      )}
    </div>
  );
} 