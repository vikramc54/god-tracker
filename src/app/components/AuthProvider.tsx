"use client";

import { SessionProvider, useSession } from "next-auth/react";
import LoginScreen from "./LoginScreen";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Protected>{children}</Protected>
        </SessionProvider>
    );
}

function Protected({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    if (!session) return <LoginScreen />;

    return children;
}
