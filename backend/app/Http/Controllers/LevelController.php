<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelRequest;
use App\Http\Resources\LevelResource;
use App\Services\LevelService;
use Illuminate\Http\Response;

class LevelController extends Controller
{
    protected $levelService;

    public function __construct(LevelService $levelService)
    {
        $this->levelService = $levelService;
    }

    public function index()
    {
        $levels = $this->levelService->all();
        return LevelResource::collection($levels);
    }

    public function store(LevelRequest $request)
    {
        try {
            $level = $this->levelService->create($request->validated());
            return new LevelResource($level);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    public function show($id)
    {
        try {
            $level = $this->levelService->find($id);
            return new LevelResource($level);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 404);
        }
    }

    public function update(LevelRequest $request, $id)
    {
        try {
            $level = $this->levelService->update($id, $request->validated());
            return new LevelResource($level);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    public function destroy($id)
    {
        try {
            $this->levelService->delete($id);
            return response()->json(['message' => 'Level deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }
}
