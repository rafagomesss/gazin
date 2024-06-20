<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeveloperRequest;
use App\Http\Resources\DeveloperResource;
use App\Services\DeveloperService;
use Illuminate\Http\Response;

class DeveloperController extends Controller
{
    protected $developerService;

    public function __construct(DeveloperService $developerService)
    {
        $this->developerService = $developerService;
    }

    public function index()
    {
        $developers = $this->developerService->all();
        return DeveloperResource::collection($developers);
    }

    public function store(DeveloperRequest $request)
    {
        try {
            $developer = $this->developerService->create($request->validated());
            return new DeveloperResource($developer);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    public function show($id)
    {
        try {
            $developer = $this->developerService->find($id);
            return new DeveloperResource($developer);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 404);
        }
    }

    public function update(DeveloperRequest $request, $id)
    {
        try {
            $developer = $this->developerService->update($id, $request->validated());
            return new DeveloperResource($developer);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    public function destroy($id)
    {
        try {
            $this->developerService->delete($id);
            return response()->json(['message' => 'Desenvolvedor deletado com sucesso'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }
}
