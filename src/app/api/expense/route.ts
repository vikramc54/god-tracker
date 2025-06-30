import requireSession from "@/lib/auth";
import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

interface ExpenseDto {
    amount: number;
    categories: string[];
    timestamp?: string;
}

export interface Expense {
    ownername: string;
    owneremail: string;
    amount: number;
    categories: string[];
    timestamp: Date;
    isDebug: boolean;
}

const isDebug = process.env.NEXT_IS_DEBUG === "true";

export async function POST(req: Request) {
    try {
        const user = await requireSession();
        if (!user) return new Response("Unauthorized", { status: 401 });
        
        const body: ExpenseDto = await req.json();

        const { amount, categories } = body;
        const timestamp = body.timestamp ? new Date(body.timestamp) : new Date();

        const expense: Expense = {
            ownername: user.name,
            owneremail: user.email,
            amount,
            categories,
            timestamp,
            isDebug,
        };

        const result = await db.collection<Expense>("expenses").insertOne(expense);
        if (!result.acknowledged) {
            throw new Error("Failed to post expense");
        }

        return NextResponse.json({ id: result.insertedId });
    } catch (err) {
        console.error("Error posting expense", err);
        return new Response("Error posting expense", { status: 500 });
    }
}
