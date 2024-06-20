<?php

namespace App\Repositories;

use App\Models\Developer;

class DeveloperRepository
{
    public function all()
    {
        return Developer::with('level')->get();
    }

    public function find($id)
    {
        return Developer::with('level')->findOrFail($id);
    }

    public function create(array $data)
    {
        return Developer::create($data);
    }

    public function update(Developer $developer, array $data)
    {
        $developer->update($data);
        return $developer;
    }

    public function delete(Developer $developer)
    {
        $developer->delete();
    }
}
