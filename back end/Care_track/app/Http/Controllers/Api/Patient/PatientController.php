<?php

namespace App\Http\Controllers\Api\Patient;

use App\Models\User;
use App\Models\Patient;
use Illuminate\Http\Request;
use App\Services\Patient\PatientService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Doctor\DoctorResource;
use App\Http\Resources\Patient\PatientResource;
use App\Http\Requests\Patient\StorePatientRequest;
use App\Http\Requests\Patient\AssignDoctorsRequest;
use App\Http\Requests\Patient\UpdatePatientRequest;
use App\Http\Resources\Patient\AssignDoctorsResource;

class PatientController extends Controller
{
    public function __construct(private PatientService $patientService) {}

    public function index()
    {
        $patients = Patient::with(['user', 'bloodClique', 'doctors', 'relative'])->get();
        return PatientResource::collection($patients);
    }

    public function store(StorePatientRequest $request)
    {
        $patient = $this->patientService->create($request->validated());

        if ($patient->success) {
            return $this->success([
                'message' => 'patient created successfully',
                'data' => new PatientResource($patient->data)
            ]);
        }

        return $this->error(null, $patient->message, 401);
    }

    public function assignDoctors(Request $request, Patient $patient)
    {
        $doctorIds = $request->input('doctor_ids', []);

        $doctors = $this->patientService->assignDoctors($patient, $doctorIds);

        if ($doctors->success) {
            return $this->success(new AssignDoctorsResource($doctors->data));
        }

        return $this->error(null, $doctors->message, 401);
    }

    public function show(Patient $patient)
    {
        $patient->load(['user', 'bloodClique', 'doctors', 'relative']);
        return $this->success(new PatientResource($patient));
    }

    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $patient = $this->patientService->update($patient, $request->validated());

        if ($patient->success) {
            return $this->success([
                'message' => 'patient updated successfully',
                'data' => new PatientResource($patient->data)
            ]);
        }

        return $this->error(null, $patient->message, 401);
    }

    // ==============================
    // 🔥 FIXED DELETE LOGIC
    // ==============================
    public function destroy(Patient $patient)
    {
        try {
            DB::transaction(function () use ($patient) {

                // 1. فك العلاقات (إذا موجودة)
                $patient->doctors()->detach();

                // 2. حذف أي بيانات مرتبطة (اختياري حسب نظامك)
                $patient->vitalSigns()?->delete();
                $patient->treatmentPlans()?->delete();

                // 3. حذف المستخدم المرتبط
                if ($patient->user) {
                    $patient->user->delete();
                }

                // 4. حذف المريض نفسه
                $patient->delete();
            });

            return $this->success([
                'message' => 'patient and related user deleted successfully'
            ]);

        } catch (\Exception $e) {
            return $this->error(null, $e->getMessage(), 500);
        }
    }

   public function myPatient()
{
    try {
        $user = auth()->user();

        $patient = Patient::with(['user', 'bloodClique', 'doctors', 'relative'])
            ->where('user_id', $user->id)
            ->first();

        if (!$patient) {
            return $this->error(null, 'Patient not found for this user', 404);
        }

        return $this->success([
            'data' => new PatientResource($patient)
        ]);

    } catch (\Exception $e) {
        return $this->error(null, $e->getMessage(), 500);
    }
}
}