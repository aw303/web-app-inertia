import { Link } from '@inertiajs/react';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-white shadow p-4 flex justify-between">
                <h1 className="font-bold">Finance Dashboard</h1>

                <div className="space-x-4">
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/transactions">Transactions</Link>
                    <Link href="/budgets">Budgets</Link>
                </div>
            </nav>

            <main className="p-6">
                {children}
            </main>

        </div>
    );
}