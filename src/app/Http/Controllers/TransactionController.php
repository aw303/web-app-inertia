<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Category;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $transactions = Transaction::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions
        ]);
    }

    public function create()
    {
        $categories = Category::where('user_id', auth()->id())->get();

        return Inertia::render('Transactions/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'type' => 'required',
            'category_id' => 'required',
            'description' => 'nullable',
            'date' => 'required|date',
        ]);

        Transaction::create([
            ...$request->all(),
            'user_id' => auth()->id()
        ]);

        return redirect('/transactions');
    }

    // Show Edit page
    public function edit(Transaction $transaction)
    {
        $this->authorize('update', $transaction);

        $categories = Category::where('user_id', auth()->id())->get();

        return Inertia::render('Transactions/Edit', [
            'transaction' => $transaction,
            'categories' => $categories
        ]);
    }

    // Update transaction
    public function update(Request $request, Transaction $transaction)
    {
        $this->authorize('update', $transaction);

        $request->validate([
            'amount' => 'required|numeric',
            'type' => 'required|in:income,expense',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $transaction->update($request->all());

        return redirect()->route('transactions.index');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return back();
    }
}