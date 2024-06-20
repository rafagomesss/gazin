<?php

namespace App\Services;

use App\Repositories\LevelRepository;
use Illuminate\Support\Facades\Validator;

class LevelService
{
    protected $levelRepository;

    public function __construct(LevelRepository $levelRepository)
    {
        $this->levelRepository = $levelRepository;
    }

    public function all()
    {
        return $this->levelRepository->all();
    }

    public function find($id)
    {
        return $this->levelRepository->find($id);
    }

    public function create(array $data)
    {
        $validator = Validator::make($data, [
            'level' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first(), 422);
        }

        return $this->levelRepository->create($data);
    }

    public function update($id, array $data)
    {
        $level = $this->levelRepository->find($id);

        $validator = Validator::make($data, [
            'level' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first(), 422);
        }

        return $this->levelRepository->update($level, $data);
    }

    public function delete($id)
    {
        $level = $this->levelRepository->find($id);

        return $this->levelRepository->delete($level);
    }
}
