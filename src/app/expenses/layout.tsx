import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Expenses - God Tracker",
    description: "Track your spending habits and manage your finances effectively",
};

export default function ExpensesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            padding: '2rem 0'
        }}>
            <div className="container">
                {children}
            </div>
        </div>
    );
}
