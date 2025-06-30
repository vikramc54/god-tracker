"use client";

interface TimestampFieldProps {
  timestamp: string;
  onTimestampChange: (timestamp: string) => void;
}

export default function TimestampField({ timestamp, onTimestampChange }: TimestampFieldProps) {
  return (
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
        onChange={(e) => onTimestampChange(e.target.value)}
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
  );
} 