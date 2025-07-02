import { Expense } from "@/app/api/expense/route";
import Mixpanel from "mixpanel";
const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const mixpanelSecret = process.env.MIXPANEL_SECRET;

if (!mixpanelToken) throw new Error("Missing env variable NEXT_PUBLIC_MIXPANEL_TOKEN");
if (!mixpanelSecret) throw new Error("Missing env variable MIXPANEL_SECRET");
const mp = Mixpanel.init(mixpanelToken, {
    secret: mixpanelSecret,
});

export default mp;

export function trackExpense(expense: Expense) {
    return new Promise<void>((resolve, reject) => {
        try {
            mp.import(
                "Expense",
                expense.timestamp,
                {
                    distinct_id: expense.owneremail,
                    ownerName: expense.ownername,
                    ownerEmail: expense.owneremail,
                    amount: expense.amount,
                    categories: expense.categories,
                    isDebug: expense.isDebug,
                },
                (err) => {
                    if (err) {
                        console.error("Error tracking expense", err);
                        reject();
                    } else {
                        resolve();
                    }
                }
            );
        } catch (err) {
            console.error("Error tracking expense", err);
            reject();
        } 
    })
}
