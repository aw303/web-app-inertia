import AppLayout from "@/Layouts/AppLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {Head} from "@inertiajs/react";

export default function Dashboard({ stats, transactions, monthlyData , budgets}) {

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded shadow">
                        <p className="text-gray-500">{stat.title}</p>
                        <h2 className="text-2xl font-bold mt-2">{stat.value}</h2>
                    </div>
                ))}
            </div>

            {/* Monthly Income vs Expense Chart */}
            <div className="bg-white p-6 rounded shadow mb-8">
                <h2 className="text-lg font-semibold mb-4">Monthly Income vs Expenses</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="income" fill="#22c55e" />
                        <Bar dataKey="expense" fill="#ef4444" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
                <table className="w-full text-left">
                    <thead>
                    <tr className="border-b">
                        <th className="p-3">Description</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id} className="border-b">
                            <td className="p-3">{t.description}</td>
                            <td>{t.type}</td>
                            <td className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                                ${t.amount}
                            </td>
                            <td>{t.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Recent Budgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {budgets.map((b) => (
                    <div key={b.id} className="bg-white p-4 rounded shadow">
                        <h3>{b.name}</h3>
                        <p>${b.spent} spent of ${b.amount}</p>
                        <div className="bg-gray-200 rounded h-2 mt-1">
                            <div className="bg-green-500 h-2 rounded" style={{ width: `${b.progress}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}