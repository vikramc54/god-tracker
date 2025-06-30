"use client";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
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
  );
} 