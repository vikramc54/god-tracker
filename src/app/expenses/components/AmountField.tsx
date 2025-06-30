"use client";

interface AmountFieldProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

export default function AmountField({ amount, onAmountChange }: AmountFieldProps) {
  return (
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
          onChange={(e) => onAmountChange(e.target.value)}
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
  );
} 