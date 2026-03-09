import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Finance Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                        {stats.map((stat, index) => (

                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow"
                            >
                                <h3 className="text-gray-500 text-sm">
                                    {stat.title}
                                </h3>

                                <p className="text-2xl font-bold mt-2">
                                    {stat.value}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}