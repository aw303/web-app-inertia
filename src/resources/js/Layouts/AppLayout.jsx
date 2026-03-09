import { Link, usePage } from "@inertiajs/react";

export default function AppLayout({ children }) {

    const { auth } = usePage().props;
    const { url } = usePage(); // gives the current URL

    // Sidebar active link
    const linkClass = (path) =>
        url.startsWith(path)
            ? "bg-blue-100 text-blue-700 font-semibold p-2 rounded block"
            : "text-gray-700 hover:bg-gray-200 p-2 rounded block";

    // Breadcrumbs
    const breadcrumbs = url
        .split("/")
        .filter((segment) => segment) // remove empty
        .map((segment, index, arr) => ({
            name: segment.charAt(0).toUpperCase() + segment.slice(1),
            href: "/" + arr.slice(0, index + 1).join("/")
        }));

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-6 font-bold text-lg">Finance Dashboard</div>
                <nav className="flex flex-col px-4 space-y-2">
                    <Link href="/dashboard" className={linkClass("/dashboard")}>
                        Dashboard
                    </Link>
                    <Link href="/transactions" className={linkClass("/transactions")}>
                        Transactions
                    </Link>
                    <Link href="/budgets" className={linkClass("/budgets")}>
                        Budgets
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">

                {/* Top Navbar */}
                <header className="bg-white shadow flex justify-between items-center p-4">
                    <div>
                        Welcome, {/* auth user name here */}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/profile" className="text-gray-600 hover:text-black">
                            Profile
                        </Link>
                        <Link href="/logout" method="post" as="button" className="text-red-600">
                            Logout
                        </Link>
                    </div>
                </header>

                {/* Breadcrumbs */}
                <div className="bg-gray-50 px-6 py-3 text-gray-600 text-sm flex space-x-2">
                    <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                    {breadcrumbs.map((crumb, index) => (
                        <span key={index} className="flex items-center">
                            <span className="mx-1">/</span>
                            <Link href={crumb.href} className="hover:underline">
                                {crumb.name}
                            </Link>
                        </span>
                    ))}
                </div>

                {/* Page content */}
                <main className="p-6">{children}</main>
            </div>

        </div>
    );
}