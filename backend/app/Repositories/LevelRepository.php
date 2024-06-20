<?php

namespace App\Repositories;

use App\Models\Level;

class LevelRepository
{
    public function all()
    {
        return Level::withCount('developers')->get();
    }

    public function find($id)
    {
        return Level::findOrFail($id);
    }

    public function create(array $data)
    {
        return Level::create($data);
    }

    public function update(Level $level, array $data)
    {
        $level->update($data);
        return $level;
    }

    public function delete(Level $level)
    {
        if ($level->developers()->count() > 0) {
            throw new \Exception('Cannot delete level. Developers are associated with this level.', 403);
        }
        $level->delete();
    }
}
