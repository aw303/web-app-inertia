<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Category;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Usage (run individually):
     * php artisan db:seed --class=TransactionSeeder
     */
    public function run(): void
    {
        $user = User::first();
        if (!$user) return;

        $incomeCategory = Category::where('user_id', $user->id)
            ->where('type', 'income')->get();

        $expenseCategory = Category::where('user_id', $user->id)
            ->where('type', 'expense')->get();

        $transactions = [
            ['category' => $incomeCategory->where('name', 'Salary')->first(), 'amount' => 4000, 'type' => 'income'],
            ['category' => $incomeCategory->where('name', 'Freelance')->first(), 'amount' => 1200, 'type' => 'income'],
            ['category' => $expenseCategory->where('name', 'Food')->first(), 'amount' => 500, 'type' => 'expense'],
            ['category' => $expenseCategory->where('name', 'Transport')->first(), 'amount' => 150, 'type' => 'expense'],
            ['category' => $expenseCategory->where('name', 'Shopping')->first(), 'amount' => 300, 'type' => 'expense'],
            ['category' => $expenseCategory->where('name', 'Rent')->first(), 'amount' => 800, 'type' => 'expense'],
        ];

        foreach ($transactions as $tx) {
            Transaction::create([
                'user_id' => $user->id,
                'category_id' => $tx['category']->id,
                'amount' => $tx['amount'],
                'type' => $tx['type'],
                'description' => $tx['category']->name,
                'date' => Carbon::now()->subDays(rand(0, 30))
            ]);
        }
    }
}