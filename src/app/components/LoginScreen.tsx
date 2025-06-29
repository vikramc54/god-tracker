import { signIn } from "next-auth/react";

export default function LoginScreen() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div className="card" style={{
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    color: 'var(--text-dark)'
                }}>
                    Welcome to God Tracker
                </h1>
                
                <p style={{
                    color: 'var(--text-light)',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    Sign in to track your daily activities and stay accountable.
                </p>
                
                <button
                    onClick={() => signIn("google")}
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        padding: '0.875rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}
                >
                    <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </button>
            </div>
        </div>
    );
}
