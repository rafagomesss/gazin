<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Level::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['level' => 'required|string|max:255']);
        return Level::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Level::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $level = Level::findOrFail($id);
        $request->validate(['level' => 'required|string|max:255']);
        $level->update($request->all());
        return $level;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $level = Level::findOrFail($id);

        if ($level->developers()->count() > 0) {
            return response()->json(['error' => 'Cannot delete level. Developers are associated with this level.'], 403);
        }

        $level->delete();
        return response()->json(['message' => 'Level deleted successfully']);
    }
}
