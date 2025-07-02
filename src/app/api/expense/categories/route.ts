import requireSession from "@/lib/auth";
import db from "@/lib/mongodb";
import { Expense } from "../route";
import { NextResponse } from "next/server";

const isDebug = process.env.NEXT_PUBLIC_IS_DEBUG === "true";

export async function GET() {
    try {
        const user = await requireSession();
        if (!user) return new Response("Unauthorized", { status: 401 });

        const categories = await db.collection<Expense>("expenses").distinct("categories", isDebug ? {} : { isDebug: false });

        return NextResponse.json(categories);
    } catch (err) {
        console.error("Error getting categories", err);
        return new Response("Error getting categories", { status: 500 });
    }
}
