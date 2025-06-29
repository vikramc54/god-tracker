import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust path as needed
import type { Session } from "next-auth";

export default async function requireSession(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<Session | null> {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        return session;
    } else {
        res.status(401).end("Unauthorized");
        return null;
    }
}
