import AppLayout from "@/Layouts/AppLayout";
import {Head, Link} from "@inertiajs/react";

export default function Index({ budgets }) {
    return (
        <AppLayout>
            <Head title="Budgets" />
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Budgets</h1>
                <Link href="/budgets/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Budget
                </Link>
            </div>

            {budgets.length === 0 && <p>No budgets found for this month.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgets.map(b => (
                    <div key={b.id} className="bg-white p-6 rounded shadow">
                        <h2 className="font-semibold">{b.category?.name || "Category"}</h2>
                        <p>Budget: ${b.amount}</p>
                        <p>Spent: ${b.spent}</p>
                        <div className="bg-gray-200 h-3 rounded mt-2">
                            <div
                                className="bg-green-500 h-3 rounded"
                                style={{ width: `${b.progress}%` }}
                            />
                        </div>
                        <p className="text-sm mt-1">{b.progress}% used</p>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}