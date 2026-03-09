<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        $income = Transaction::where('type', 'income')
            ->where('user_id', auth()->id())
            ->sum('amount');

        $expense = Transaction::where('type', 'expense')
            ->where('user_id', auth()->id())
            ->sum('amount');

        $balance = $income - $expense;

        $stats = [
            [
                'title' => 'Total Balance',
                'value' => '$' . number_format($balance, 2)
            ],
            [
                'title' => 'Total Income',
                'value' => '$' . number_format($income, 2)
            ],
            [
                'title' => 'Total Expenses',
                'value' => '$' . number_format($expense, 2)
            ],
            [
                'title' => 'Savings',
                'value' => '$' . number_format($balance, 2)
            ],
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}