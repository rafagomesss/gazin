<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'gender',
        'birthdate',
        'hobby',
        'level_id',
    ];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
