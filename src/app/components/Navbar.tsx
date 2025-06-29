"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav style={{
            backgroundColor: 'var(--white)',
            borderBottom: '1px solid var(--gray-200)',
            boxShadow: 'var(--shadow-sm)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <Link href="/" style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--primary-blue)',
                        textDecoration: 'none'
                    }}>
                        God Tracker
                    </Link>
                    
                    {/* Desktop Navigation */}
                    {session && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }} className="hidden md:flex">
                            <Link href="/expenses" style={{
                                color: 'var(--text-dark)',
                                textDecoration: 'none',
                                fontWeight: '500',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.375rem',
                                transition: 'all 0.2s ease-in-out'
                            }} onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                                e.currentTarget.style.color = 'var(--primary-blue)';
                            }} onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-dark)';
                            }}>
                                Expenses
                            </Link>
                            <Link href="/health" style={{
                                color: 'var(--text-dark)',
                                textDecoration: 'none',
                                fontWeight: '500',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.375rem',
                                transition: 'all 0.2s ease-in-out'
                            }} onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                                e.currentTarget.style.color = 'var(--primary-blue)';
                            }} onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-dark)';
                            }}>
                                Health
                            </Link>
                            <Link href="/job" style={{
                                color: 'var(--text-dark)',
                                textDecoration: 'none',
                                fontWeight: '500',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.375rem',
                                transition: 'all 0.2s ease-in-out'
                            }} onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                                e.currentTarget.style.color = 'var(--primary-blue)';
                            }} onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--text-dark)';
                            }}>
                                Job
                            </Link>
                        </div>
                    )}
                </div>
                
                {/* Desktop Logout Button */}
                {session && (
                    <button 
                        onClick={() => signOut()}
                        className="btn btn-secondary hidden md:inline-flex"
                        style={{
                            fontSize: '0.875rem',
                            padding: '0.5rem 1rem'
                        }}
                    >
                        Logout
                    </button>
                )}

                {/* Mobile Hamburger Menu Button */}
                {session && (
                    <button
                        onClick={toggleMobileMenu}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '2rem',
                            height: '2rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0'
                        }}
                        className="md:hidden"
                    >
                        <span style={{
                            width: '1.5rem',
                            height: '2px',
                            backgroundColor: 'var(--text-dark)',
                            marginBottom: '4px',
                            transition: 'all 0.3s ease-in-out',
                            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0deg)'
                        }}></span>
                        <span style={{
                            width: '1.5rem',
                            height: '2px',
                            backgroundColor: 'var(--text-dark)',
                            marginBottom: '4px',
                            transition: 'all 0.3s ease-in-out',
                            opacity: isMobileMenuOpen ? '0' : '1'
                        }}></span>
                        <span style={{
                            width: '1.5rem',
                            height: '2px',
                            backgroundColor: 'var(--text-dark)',
                            transition: 'all 0.3s ease-in-out',
                            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0deg)'
                        }}></span>
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            {session && isMobileMenuOpen && (
                <div style={{
                    backgroundColor: 'var(--white)',
                    borderTop: '1px solid var(--gray-200)',
                    padding: '1rem 0',
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div className="container">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <Link 
                                href="/expenses" 
                                onClick={closeMobileMenu}
                                style={{
                                    color: 'var(--text-dark)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.375rem',
                                    transition: 'all 0.2s ease-in-out',
                                    border: '1px solid transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                                    e.currentTarget.style.color = 'var(--primary-blue)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-dark)';
                                }}
                            >
                                Expenses
                            </Link>
                            <Link 
                                href="/health" 
                                onClick={closeMobileMenu}
                                style={{
                                    color: 'var(--text-dark)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.375rem',
                                    transition: 'all 0.2s ease-in-out',
                                    border: '1px solid transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                                    e.currentTarget.style.color = 'var(--primary-blue)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-dark)';
                                }}
                            >
                                Health
                            </Link>
                            <Link 
                                href="/job" 
                                onClick={closeMobileMenu}
                                style={{
                                    color: 'var(--text-dark)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.375rem',
                                    transition: 'all 0.2s ease-in-out',
                                    border: '1px solid transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                                    e.currentTarget.style.color = 'var(--primary-blue)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-dark)';
                                }}
                            >
                                Job
                            </Link>
                            <div style={{
                                borderTop: '1px solid var(--gray-200)',
                                marginTop: '0.5rem',
                                paddingTop: '0.5rem'
                            }}>
                                <button 
                                    onClick={() => {
                                        signOut();
                                        closeMobileMenu();
                                    }}
                                    className="btn btn-secondary"
                                    style={{
                                        width: '100%',
                                        fontSize: '0.875rem',
                                        padding: '0.75rem 1rem',
                                        justifyContent: 'flex-start'
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
