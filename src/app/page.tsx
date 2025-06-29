"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem 0'
    }}>
      <div className="container">
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
            Welcome to God Tracker
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-light)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Track your daily activities across different areas of your life. Stay accountable and monitor your progress.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <Link href="/expenses" style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              border: '2px solid transparent'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--primary-blue-light)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: 'var(--primary-blue-light)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    color: 'var(--primary-blue)',
                    fontWeight: '600'
                  }}>💰</span>
                </div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  margin: '0'
                }}>
                  Expenses
                </h2>
              </div>
              <p style={{
                color: 'var(--text-light)',
                lineHeight: '1.5',
                margin: '0'
              }}>
                Track your spending habits and manage your finances effectively.
              </p>
            </div>
          </Link>

          <Link href="/health" style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              border: '2px solid transparent'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--primary-blue-light)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: 'var(--primary-blue-light)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    color: 'var(--primary-blue)',
                    fontWeight: '600'
                  }}>🏃</span>
                </div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  margin: '0'
                }}>
                  Health
                </h2>
              </div>
              <p style={{
                color: 'var(--text-light)',
                lineHeight: '1.5',
                margin: '0'
              }}>
                Monitor your fitness goals, workouts, and overall wellness journey.
              </p>
            </div>
          </Link>

          <Link href="/job" style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              border: '2px solid transparent'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--primary-blue-light)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: 'var(--primary-blue-light)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    color: 'var(--primary-blue)',
                    fontWeight: '600'
                  }}>💼</span>
                </div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-dark)',
                  margin: '0'
                }}>
                  Job
                </h2>
              </div>
              <p style={{
                color: 'var(--text-light)',
                lineHeight: '1.5',
                margin: '0'
              }}>
                Track your professional development, tasks, and career goals.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
