import AppLayout from "@/Layouts/AppLayout";
import {Head, useForm} from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        amount: "",
        month: new Date().toISOString().slice(0, 10)
    });

    const submit = (e) => {
        e.preventDefault();
        post("/budgets");
    };

    return (
        <AppLayout>
            <Head title="Budgets" />
            <h1 className="text-2xl font-bold mb-6">Add Budget</h1>

            <form onSubmit={submit} className="bg-white p-6 shadow rounded space-y-4">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData("amount", e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                </div>

                <div>
                    <label>Month</label>
                    <input
                        type="month"
                        value={data.month}
                        onChange={(e) => setData("month", e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    {errors.month && <p className="text-red-500">{errors.month}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save Budget
                </button>
            </form>
        </AppLayout>
    );
}