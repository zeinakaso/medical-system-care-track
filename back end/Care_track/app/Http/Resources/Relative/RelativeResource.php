<?php

namespace App\Http\Resources\Relative;

use Illuminate\Http\Request;
use App\Http\Resources\Patient\PatientResource;
use Illuminate\Http\Resources\Json\JsonResource;

class RelativeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
{
    return [
        'id' => $this->id,
        'relation' => $this->relation,
        'phone' => $this->phone,

        'user' => [
            'name' => $this->user->name,
            'email' => $this->user->email,
        ],

        // 👇 المرضى المرتبطين بهذا القريب
        'patients' => $this->patients->map(function ($patient) {
            return [
                'id' => $patient->id,
                'name' => $patient->user->name ?? null,
                'email' => $patient->user->email ?? null,
            ];
        }),
    ];
}
}
