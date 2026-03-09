<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    protected $fillable = ['amount','name', 'month', 'user_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}