<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Transaction;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Demo User',
                'email' => 'demo@test.com',
                'password' => bcrypt('password')
            ]);
        }

        $categories = [
            ['name' => 'Salary', 'type' => 'income'],
            ['name' => 'Freelance', 'type' => 'income'],
            ['name' => 'Food', 'type' => 'expense'],
            ['name' => 'Transport', 'type' => 'expense'],
            ['name' => 'Shopping', 'type' => 'expense'],
        ];

        foreach ($categories as $c) {
            Category::create([
                'user_id' => $user->id,
                'name' => $c['name'],
                'type' => $c['type']
            ]);
        }

        $incomeCategory = Category::where('type', 'income')->first();
        $expenseCategory = Category::where('type', 'expense')->first();

        Transaction::insert([
            [
                'user_id' => $user->id,
                'category_id' => $incomeCategory->id,
                'amount' => 4000,
                'type' => 'income',
                'description' => 'Monthly Salary',
                'date' => Carbon::now(),
            ],
            [
                'user_id' => $user->id,
                'category_id' => $expenseCategory->id,
                'amount' => 120,
                'type' => 'expense',
                'description' => 'Groceries',
                'date' => Carbon::now(),
            ],
            [
                'user_id' => $user->id,
                'category_id' => $expenseCategory->id,
                'amount' => 60,
                'type' => 'expense',
                'description' => 'Transport',
                'date' => Carbon::now(),
            ],
            [
                'user_id' => $user->id,
                'category_id' => $incomeCategory->id,
                'amount' => 800,
                'type' => 'income',
                'description' => 'Freelance Project',
                'date' => Carbon::now(),
            ],
        ]);
    }
}