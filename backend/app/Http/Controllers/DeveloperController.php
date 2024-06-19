<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DeveloperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $developers = Developer::with('level')->get();
            return response()->json($developers, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage() . ' : Erro ao buscar desenvolvedores'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'gender' => 'required|string|max:1',
            'birthdate' => 'required|date',
            'hobby' => 'nullable|string|max:255',
            'level_id' => 'required|exists:levels,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $developer = Developer::create($request->all());
            return response()->json($developer, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getmessage() . ' : Erro ao criar desenvolvedor'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $developer = Developer::with('level')->findOrFail($id);
            return response()->json($developer, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage() . ' : Desenvolvedor não encontrado'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'gender' => 'required|string|max:1',
            'birthdate' => 'required|date',
            'hobby' => 'nullable|string|max:255',
            'level_id' => 'required|exists:levels,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $developer = Developer::findOrFail($id);
            $developer->update($request->all());
            return response()->json($developer, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage() . ' : Erro ao atualizar desenvolvedor'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Developer::findOrFail($id)->delete();
            return response()->json(['message' => 'Desenvolvedor deletado com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage() . ' : Erro ao deletar desenvolvedor'], 500);
        }
    }
}
