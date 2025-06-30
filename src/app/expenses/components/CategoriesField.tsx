"use client";

import { useState, useEffect, useRef } from "react";

interface CategoriesFieldProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export default function CategoriesField({ selectedCategories, onCategoriesChange }: CategoriesFieldProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualCategory, setManualCategory] = useState("");
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch categories on component mount
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
      onCategoriesChange([...selectedCategories, category]);
    }
    setCategoryInput("");
    setShowCategoryDropdown(false);
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    onCategoriesChange(selectedCategories.filter(cat => cat !== categoryToRemove));
  };

  const handleAddManualCategory = () => {
    if (manualCategory.trim() && !selectedCategories.includes(manualCategory.trim())) {
      onCategoriesChange([...selectedCategories, manualCategory.trim()]);
      setManualCategory("");
      setShowManualInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showManualInput) {
        handleAddManualCategory();
      } else if (filteredCategories.length > 0) {
        handleAddCategory(filteredCategories[0]);
      }
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: 'var(--text-dark)'
      }}>
        Categories
      </label>
      
      {/* Manual Category Toggle */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: 'var(--text-light)'
        }}>
          <input
            type="checkbox"
            checked={showManualInput}
            onChange={(e) => setShowManualInput(e.target.checked)}
            style={{
              width: '1rem',
              height: '1rem',
              cursor: 'pointer'
            }}
          />
          Add new category manually
        </label>
      </div>

      {/* Manual Category Input */}
      {showManualInput && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={manualCategory}
              onChange={(e) => setManualCategory(e.target.value)}
              placeholder="Enter new category..."
              onKeyPress={handleKeyPress}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid var(--gray-200)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'var(--white)',
                color: 'var(--text-dark)'
              }}
            />
            <button
              type="button"
              onClick={handleAddManualCategory}
              disabled={!manualCategory.trim()}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: manualCategory.trim() ? 'var(--primary-blue)' : 'var(--gray-300)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: manualCategory.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
      
      {/* Category Autocomplete Input */}
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
          onKeyPress={handleKeyPress}
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
  );
} 