import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export default async function requireSession() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return session.user as {
            name: string;
            email: string;
            image?: string;
        };
    }

    throw new Error("Unauthorized");
}
