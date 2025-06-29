import requireSession from "@/lib/auth";
import { Expense } from "@/app/api/expense/route";
import db from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        console.log("HITTING THIS API");
        const user = await requireSession();
        if (!user) return new Response("Unauthorized", { status: 401 });

        if (!req.url) {
            return new Response("Invalid request", { status: 400 });
        }

        const { searchParams } = new URL(req.url);
        const month = parseInt(searchParams.get("month") || "");
        const year = parseInt(searchParams.get("year") || "");
        if (isNaN(year) || isNaN(month) || month < 1 || month > 12 || year < 2000 || year > 3000) {
            return new Response("Invalid month or year", { status: 400 });
        }

        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);

        const result = await db
            .collection<Expense>("expenses")
            .aggregate<{ total: number }>([
                {
                    $match: {
                        timestamp: {
                            $gte: start,
                            $lt: end,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$amount" },
                    },
                },
            ])
            .toArray();
        console.log("result", result);

        if (!result) {
            throw new Error("Failed to get total");
        }

        return NextResponse.json(result[0]?.total ?? 0);
    } catch (err) {
        console.error("Error getting categories", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
