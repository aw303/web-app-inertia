<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $income = Transaction::where('type', 'income')
            ->where('user_id', $userId)
            ->sum('amount');

        $expense = Transaction::where('type', 'expense')
            ->where('user_id', $userId)
            ->sum('amount');

        $balance = $income - $expense;

        $stats = [
            ['title' => 'Total Balance', 'value' => '$' . number_format($balance, 2)],
            ['title' => 'Total Income', 'value' => '$' . number_format($income, 2)],
            ['title' => 'Total Expenses', 'value' => '$' . number_format($expense, 2)],
            ['title' => 'Savings', 'value' => '$' . number_format($balance, 2)],
        ];

        // Monthly summary for last 6 months
        $monthlyData = collect();
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i)->format('Y-m');

            $monthIncome = Transaction::where('user_id', $userId)
                ->where('type', 'income')
                ->whereYear('date', Carbon::now()->subMonths($i)->year)
                ->whereMonth('date', Carbon::now()->subMonths($i)->month)
                ->sum('amount');

            $monthExpense = Transaction::where('user_id', $userId)
                ->where('type', 'expense')
                ->whereYear('date', Carbon::now()->subMonths($i)->year)
                ->whereMonth('date', Carbon::now()->subMonths($i)->month)
                ->sum('amount');

            $monthlyData->push([
                'month' => Carbon::now()->subMonths($i)->format('M'),
                'income' => $monthIncome,
                'expense' => $monthExpense
            ]);
        }


        // 3️⃣ Budgets for current month
        $month = now()->format('Y-m');
        $budgets = Budget::with('category')
            ->where('user_id', $userId)
            ->where('month', $month)
            ->get();

        $budgets->transform(function ($budget) use ($userId, $month) {
            $spent = Transaction::where('user_id', $userId)
                ->where('type', 'expense')
                ->where('category_id', $budget->category_id)
                ->where('date', 'like', $month . '%')
                ->sum('amount');

            $budget->spent = $spent;
            $budget->progress = min(round(($spent / $budget->amount) * 100, 0), 100);

            return $budget;
        });

        $transactions = Transaction::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();



        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'transactions' => $transactions,
            'budgets' => $budgets,
            'monthlyExpenses' => $monthlyData
        ]);
    }
}