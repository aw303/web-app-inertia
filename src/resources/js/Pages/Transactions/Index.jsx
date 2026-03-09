import AppLayout from "@/Layouts/AppLayout";
import { Link, router } from "@inertiajs/react";

export default function Index({ transactions }) {

    function deleteTransaction(id) {
        if (confirm("Delete transaction?")) {
            router.delete(`/transactions/${id}`);
        }
    }

    return (
        <AppLayout>

            <div className="flex justify-between mb-6">

                <h1 className="text-2xl font-bold">
                    Transactions
                </h1>

                <Link
                    href="/transactions/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Transaction
                </Link>

            </div>

            <table className="w-full bg-white shadow rounded">
                <thead>
                <tr className="border-b">
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((t) => (
                    <tr key={t.id} className="border-b">
                        <td className="p-3">{t.description}</td>
                        <td>{t.type}</td>
                        <td className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                            ${t.amount}
                        </td>
                        <td>{t.date}</td>
                        <td className="space-x-2">
                            {/* Edit Button */}
                            <Link
                                href={`/transactions/${t.id}/edit`}
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </Link>

                            {/* Delete Button */}
                            <button
                                onClick={() => deleteTransaction(t.id)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </AppLayout>
    );
}