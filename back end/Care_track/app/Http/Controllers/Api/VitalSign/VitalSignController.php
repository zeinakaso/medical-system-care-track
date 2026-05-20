<?php

namespace App\Http\Controllers\Api\VitalSign;

use App\Models\VitalSign;
use App\Models\Patient;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\VitalSign\VitalSignService;
use App\Http\Resources\VitalSign\VitalSignResource;
use App\Http\Requests\VitalSign\StoreVitalSignRequest;
use App\Http\Requests\VitalSign\UpdateVitalSignRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Resources\VitalSign\VitalSignAverageResource;

class VitalSignController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private VitalSignService $vitalSignService) {}

    // =========================
    // 📌 INDEX
    // =========================
    public function index(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $result = $this->vitalSignService->index($request->all(), $user);

        if (!$result->success) {
            return $this->error(null, $result->message);
        }

        return $this->paginated(
            $result->data,
            VitalSignResource::class,
            'Vital signs retrieved successfully.'
        );
    }

    // =========================
    // 📌 STORE
    // =========================
    public function store(StoreVitalSignRequest $request)
    {
        $vitalSign = $this->vitalSignService->create($request->validated());

        if ($vitalSign->success) {
            return $this->success([
                'message' => 'vitalSign created successfully',
                'data' => new VitalSignResource($vitalSign->data)
            ]);
        }

        return $this->error(null, $vitalSign->message, 401);
    }

    // =========================
    // 📌 SHOW
    // =========================
    public function show(VitalSign $vitalSign)
    {
        $this->authorize('view', $vitalSign);

        return $this->success(
            new VitalSignResource($vitalSign)
        );
    }

    // =========================
    // 📌 UPDATE
    // =========================
    public function update(UpdateVitalSignRequest $request, VitalSign $vitalSign)
    {
        $this->authorize('update', $vitalSign);

        $vitalSign = $this->vitalSignService->update($vitalSign, $request->validated());

        if ($vitalSign->success) {
            return $this->success([
                'message' => 'vitalSign updated successfully',
                'data' => new VitalSignResource($vitalSign->data)
            ]);
        }

        return $this->error(null, $vitalSign->message, 401);
    }

    // =========================
    // 📌 DELETE
    // =========================
    public function destroy(VitalSign $vitalSign)
    {
        $this->authorize('delete', $vitalSign);

        $deletion = $this->vitalSignService->delete($vitalSign);

        return $deletion->success
            ? $this->success([
                'message' => 'vitalSign deleted successfully',
                'data' => new VitalSignResource($deletion->data)
            ])
            : $this->error(null, $deletion->message, 401);
    }

    // =========================
    // 🚀 NEW: GET VITALS BY USER ID
    // =========================
    public function getByUserId($userId)
{
    try {

        $authUser = JWTAuth::parseToken()->authenticate();

        // =========================
        // 1. تحويل user → patient
        // =========================
        $patient = Patient::where('user_id', $userId)->first();

        if (!$patient) {
            return $this->error(null, 'Patient not found for this user', 404);
        }

        // =========================
        // 2. AUTH LOGIC (doctor / relative / admin)
        // =========================

        // 👨‍⚕️ DOCTOR CHECK
        if ($authUser->role === 'doctor') {

            $doctor = $authUser->doctor;

            if (!$doctor) {
                return $this->error(null, 'Doctor profile not found', 403);
            }

            $isLinked = $doctor->patients()
                ->where('patients.id', $patient->id)
                ->exists();

            if (!$isLinked) {
                return $this->error(null, 'You are not allowed to access this patient', 403);
            }
        }

        // 👨‍👩‍👧 RELATIVE CHECK
        if ($authUser->role === 'relative') {

            $relative = $authUser->relative;

            if (!$relative) {
                return $this->error(null, 'Relative profile not found', 403);
            }

            $isAllowed = $relative->patients()
                ->where('patients.id', $patient->id)
                ->exists();

            if (!$isAllowed) {
                return $this->error(null, 'You are not allowed to access this patient', 403);
            }
        }

        // =========================
        // 3. GET VITALS
        // =========================
        $vitals = VitalSign::where('patient_id', $patient->id)
            ->latest()
            ->get();

        return $this->success([
            'patient_id' => $patient->id,
            'data' => VitalSignResource::collection($vitals)
        ]);

    } catch (\Exception $e) {
        return $this->error(null, $e->getMessage(), 500);
    }
}

    // =========================
    // 📌 OLD RELATIVE METHOD (يمكن الإبقاء عليه أو حذفه لاحقاً)
    // =========================
    public function getPatientVitals($patientId)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $relative = $user->relative;
        if (!$relative || !$relative->patients->pluck('id')->contains($patientId)) {
            return response()->json([
                'message' => 'غير مسموح بالوصول لهذا المريض.'
            ], 403);
        }

        $vitals = VitalSign::where('patient_id', $patientId)->get();

        return response()->json([
            'status' => 'success',
            'data' => VitalSignResource::collection($vitals)
        ]);
    }
}