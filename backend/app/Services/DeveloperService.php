<?php

namespace App\Services;

use App\Repositories\DeveloperRepository;
use Illuminate\Support\Facades\Validator;

class DeveloperService
{
    protected $developerRepository;

    public function __construct(DeveloperRepository $developerRepository)
    {
        $this->developerRepository = $developerRepository;
    }

    public function all()
    {
        return $this->developerRepository->all();
    }

    public function find($id)
    {
        return $this->developerRepository->find($id);
    }

    public function create(array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'gender' => 'required|string|max:1',
            'birthdate' => 'required|date',
            'hobby' => 'nullable|string|max:255',
            'level_id' => 'required|exists:levels,id'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first(), 422);
        }

        return $this->developerRepository->create($data);
    }

    public function update($id, array $data)
    {
        $developer = $this->developerRepository->find($id);

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'gender' => 'required|string|max:1',
            'birthdate' => 'required|date',
            'hobby' => 'nullable|string|max:255',
            'level_id' => 'required|exists:levels,id'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first(), 422);
        }

        return $this->developerRepository->update($developer, $data);
    }

    public function delete($id)
    {
        $developer = $this->developerRepository->find($id);

        return $this->developerRepository->delete($developer);
    }
}
