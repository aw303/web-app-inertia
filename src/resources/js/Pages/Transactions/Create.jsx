import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";

export default function Create({ categories }) {

    const { data, setData, post, processing, errors } = useForm({
        description: "",
        type: "expense",
        amount: "",
        category_id: categories[0]?.id || "",
        date: new Date().toISOString().slice(0, 10)
    });

    const submit = (e) => {
        e.preventDefault();
        post("/transactions");
    };

    return (
        <AppLayout>

            <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>

            <form onSubmit={submit} className="bg-white shadow rounded p-6">

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <input
                        type="text"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Amount</label>
                    <input
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData("amount", e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        className="border p-2 w-full rounded"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    {errors.type && <p className="text-red-500">{errors.type}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <select
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                        className="border p-2 w-full rounded"
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name} ({cat.type})
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-red-500">{errors.category_id}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={(e) => setData("date", e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    {errors.date && <p className="text-red-500">{errors.date}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save
                </button>

            </form>

        </AppLayout>
    );
}