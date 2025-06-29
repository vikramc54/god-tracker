"use client";

import { useState, useEffect, useRef } from "react";

interface ExpenseDto {
  amount: number;
  categories: string[];
  timestamp?: string;
}

interface TotalSpending {
  month: number;
  year: number;
  total: number;
}

export default function ExpensesPage() {
  const [totalSpending, setTotalSpending] = useState<TotalSpending | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [amount, setAmount] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current month and year
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Initialize timestamp with current date and time (20-minute intervals)
  useEffect(() => {
    const now = new Date();
    const minutes = Math.floor(now.getMinutes() / 20) * 20;
    now.setMinutes(minutes, 0, 0);
    setTimestamp(now.toISOString().slice(0, 16));
  }, []);

  // Fetch total spending for current month
  useEffect(() => {
    fetchTotalSpending(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on input
  useEffect(() => {
    if (categoryInput.trim() === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(cat =>
        cat.toLowerCase().includes(categoryInput.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [categoryInput, categories]);

  // Handle clicks outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        categoryInputRef.current &&
        !categoryInputRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTotalSpending = async (month: number, year: number) => {
    try {
      const response = await fetch(`/api/expense/total?month=${month}&year=${year}`);
      if (response.ok) {
        const total = await response.json();
        setTotalSpending({ month, year, total });
      }
    } catch (error) {
      console.error("Error fetching total spending:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/expense/categories");
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
        setFilteredCategories(categoriesData);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCategoryInput("");
    setShowCategoryDropdown(false);
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== categoryToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || selectedCategories.length === 0) {
      alert("Please fill in amount and select at least one category");
      return;
    }

    setIsSubmitting(true);

    try {
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
        setCategoryInput("");
        
        // Refresh total spending
        fetchTotalSpending(currentMonth, currentYear);
        
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
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: 'var(--text-dark)'
        }}>
          Total Spending
        </h2>
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

      {/* Add Expense Section */}
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
          {/* Amount Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: 'var(--text-dark)'
            }}>
              Amount
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                position: 'absolute',
                left: '0.75rem',
                color: 'var(--text-light)',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                ₹
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                step="0.01"
                min="0"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2rem',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: 'var(--white)',
                  color: 'var(--text-dark)'
                }}
                required
              />
            </div>
          </div>

          {/* Timestamp Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: 'var(--text-dark)'
            }}>
              Timestamp
            </label>
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-200)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'var(--white)',
                color: 'var(--text-dark)'
              }}
              required
            />
          </div>

          {/* Categories Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: 'var(--text-dark)'
            }}>
              Categories
            </label>
            
            {/* Category Input */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input
                ref={categoryInputRef}
                type="text"
                value={categoryInput}
                onChange={(e) => {
                  setCategoryInput(e.target.value);
                  setShowCategoryDropdown(true);
                }}
                onFocus={() => setShowCategoryDropdown(true)}
                placeholder="Type to search categories..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: 'var(--white)',
                  color: 'var(--text-dark)'
                }}
              />
              
              {/* Category Dropdown */}
              {showCategoryDropdown && filteredCategories.length > 0 && (
                <div
                  ref={dropdownRef}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: '0.5rem',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 10,
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}
                >
                  {filteredCategories.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleAddCategory(category)}
                      style={{
                        padding: '0.75rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid var(--gray-100)',
                        color: 'var(--text-dark)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--white)';
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Categories */}
            {selectedCategories.length > 0 && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'var(--primary-blue-light)',
                      color: 'var(--primary-blue)',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--primary-blue)',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        padding: '0',
                        width: '1rem',
                        height: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              backgroundColor: isSubmitting ? 'var(--gray-300)' : 'var(--primary-blue)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = 'var(--primary-blue-hover)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = 'var(--primary-blue)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isSubmitting ? 'Adding...' : 'Add Expense'}
          </button>
        </form>
      </div>
    </div>
  );
}
