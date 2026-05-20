<?php

namespace App\Http\Controllers\Api\TreatmentPlan;

use Illuminate\Http\Request;
use App\Models\TreatmentPlan;
use App\Models\Patient;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Resources\Patient\PatientResource;
use App\Services\TreatmentPlan\TreatmentPlanService;
use App\Http\Resources\TreatmentPlan\TreatmentPlanResource;
use App\Http\Requests\TreatmentPlan\StorTreatmentPlanRequest;
use App\Http\Requests\TreatmentPlan\UpdateTreatmentPlanRequest;

class TreatmentPlanController extends Controller
{
    public function __construct(private TreatmentPlanService $service) {}

    // =========================
    // 📌 GET ALL (for doctor/admin logic)
    // =========================
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();

        $result = $this->service->index($user);

        if (!$result->success) {
            return $this->error(null, $result->message);
        }

        return $this->paginated(
            $result->data,
            TreatmentPlanResource::class,
            'Treatment plans retrieved successfully.'
        );
    }

    // =========================
    // 📌 CREATE PLAN
    // =========================
    public function store(StorTreatmentPlanRequest $request)
    {
        $result = $this->service->store($request);

        if (!$result->success) {
            return response()->json([
                'message' => $result->message,
            ], 403);
        }

        return response()->json([
            'message' => $result->message,
            'data'    => new TreatmentPlanResource($result->data),
        ], 201);
    }

    // =========================
    // 📌 GET MY PLANS (auth user)
    // =========================
    public function myPlans(Request $request)
    {
        $user = $request->user();

        if (!$user || !$user->patient) {
            return response()->json([
                'message' => 'Patient not found'
            ], 404);
        }

        $plans = $user->patient->treatmentPlans;

        return response()->json([
            'data' => TreatmentPlanResource::collection($plans)
        ]);
    }

    // =========================
    // 📌 GET PATIENTS LINKED TO DOCTOR
    // =========================
    public function LinkedPatient()
    {
        $user = JWTAuth::parseToken()->authenticate();

        $doctor = $user->doctor;
        if (!$doctor) {
            return response()->json(['message' => 'الطبيب غير موجود'], 403);
        }

        return PatientResource::collection($doctor->patients);
    }

    // =========================
    // 📌 SHOW SINGLE PLAN
    // =========================
    public function show(TreatmentPlan $treatmentPlan)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $result = $this->service->show($user, $treatmentPlan);

        if (!$result->success) {
            return $this->error(null, $result->message, 403);
        }

        return $this->success([
            'message' => 'Treatment plan retrieved successfully.',
            'data' => new TreatmentPlanResource($result->data),
        ]);
    }

    // =========================
    // 📌 UPDATE PLAN
    // =========================
    public function update(UpdateTreatmentPlanRequest $request, TreatmentPlan $treatmentPlan)
    {
        $result = $this->service->update($treatmentPlan, $request->validated());

        if ($result->success) {
            return $this->success([
                'message' => 'Treatment plan updated successfully.',
                'data' => new TreatmentPlanResource($result->data),
            ]);
        }

        return $this->error(null, $result->message, 403);
    }

    // =========================
    // 📌 DELETE PLAN
    // =========================
    public function destroy(TreatmentPlan $treatmentPlan)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $result = $this->service->delete($user, $treatmentPlan);

        if (!$result->success) {
            return $this->error(null, $result->message, 403);
        }

        return $this->success([
            'message' => $result->message,
        ]);
    }

    // =========================
    // 🚀 NEW: GET PLANS BY USER ID (IMPORTANT)
    // =========================
   public function getByUserId($userId)
{
    try {

        $authUser = JWTAuth::parseToken()->authenticate();

        // 1. تحويل user -> patient
        $patient = Patient::where('user_id', $userId)->first();

        if (!$patient) {
            return $this->error(null, 'Patient not found for this user', 404);
        }

        // ==============================
        // 🔐 AUTH LOGIC (IMPORTANT FIX)
        // ==============================

        // 👨‍⚕️ إذا كان الطبيب هو المستخدم الحالي
        if ($authUser->role === 'doctor') {

            $doctor = $authUser->doctor;

            if (!$doctor) {
                return $this->error(null, 'Doctor profile not found', 403);
            }

            // هل هذا المريض ضمن مرضى الطبيب؟
            $isLinked = $doctor->patients()
                ->where('patients.id', $patient->id)
                ->exists();

            if (!$isLinked) {
                return $this->error(null, 'You are not allowed to access this patient', 403);
            }
        }

        // 👨‍👩‍👧 إذا كان قريب (نفس منطقك السابق)
        if ($authUser->role === 'relative') {

            $relative = $authUser->relative;

            if (!$relative) {
                return $this->error(null, 'Relative not found', 403);
            }

            $isAllowed = $relative->patients()
                ->where('patients.id', $patient->id)
                ->exists();

            if (!$isAllowed) {
                return $this->error(null, 'You are not allowed to access this patient', 403);
            }
        }

        // ==============================
        // 📦 GET DATA
        // ==============================

        $plans = TreatmentPlan::where('patient_id', $patient->id)
            ->latest()
            ->get();

        return $this->success([
            'patient_id' => $patient->id,
            'data' => TreatmentPlanResource::collection($plans)
        ]);

    } catch (\Exception $e) {
        return $this->error(null, $e->getMessage(), 500);
    }
}
}