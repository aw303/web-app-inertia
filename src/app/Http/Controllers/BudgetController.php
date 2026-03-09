<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Budget;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BudgetController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $currentMonth = now()->format('Y-m');

        $budgets = Budget::where('user_id', $userId)
            ->where('month', $currentMonth)
            ->get();

        // Calculate spent per budget
        $budgets->transform(function ($budget) use ($userId) {
            $spent = Transaction::where('user_id', $userId)
                ->where('type', 'expense')
                ->where('category_id', $budget->id)
                ->where('date', 'like', $budget->month.'%')
                ->sum('amount');

            $budget->spent = $spent;
            $budget->progress = min(round(($spent / $budget->amount) * 100, 0), 100);

            return $budget;
        });

        return Inertia::render('Budgets/Index', [
            'budgets' => $budgets
        ]);
    }

    public function create()
    {
        return Inertia::render('Budgets/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'amount' => 'required|numeric',
            'month' => 'required|date'
        ]);

        Budget::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'amount' => $request->amount,
            'month' => $request->month
        ]);

        return redirect()->route('budgets.index');
    }
}