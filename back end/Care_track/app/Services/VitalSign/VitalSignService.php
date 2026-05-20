<?php

namespace App\Services\VitalSign;

use Exception;
use App\Models\User;
use App\Models\VitalSign;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use App\Services\Result\ServiceResult;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Services\Notification\NotificationService;
use App\Http\Resources\VitalSign\VitalSignResource;

class VitalSignService
{

    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function create(array $data): ServiceResult
    {
        $user = JWTAuth::parseToken()->authenticate();

        $patient = $user->patient;

        if (!$patient) {
            return new ServiceResult(false, null, 'Patient not found for this user.');
        }

        try {
            $vitalSign = VitalSign::create([
                'patient_id' => $patient->id,
                'temperature' => $data['temperature'],
                'heart_rate' => $data['heart_rate'],
                'blood_pressure_systolic' => $data['blood_pressure_systolic'],
                'blood_pressure_diastolic' => $data['blood_pressure_diastolic'],
                'respiratory_rate' => $data['respiratory_rate'],
                'measured_at' => $data['measured_at'] ?? now(),
            ]);

            $shouldAlert = $this->checkForAlerts($data);

            if ($shouldAlert) {
                $this->notificationService->sendAlertToDoctors($patient->id, $vitalSign);
            }

            return new ServiceResult(true, $vitalSign);
        } catch (Exception $e) {
            Log::error('Failed to create vitalSign: ' . $e->getMessage());
            return new ServiceResult(false, null, "Failed to create vitalSign");
        }
    }


    public function checkForAlerts(array $vitalData): bool
    {
        if ($vitalData['temperature'] > 39) return true;
        if ($vitalData['blood_pressure_systolic'] > 140 || $vitalData['blood_pressure_diastolic'] > 90) return true;
        if ($vitalData['heart_rate'] > 120 || $vitalData['heart_rate'] < 50) return true;
        if ($vitalData['respiratory_rate'] > 30) return true;

        return false;
    }




    public function update(VitalSign $vitalSign, array $data)
    {
        try {

            $vitalSign->update($data);

            return new ServiceResult(true, $vitalSign);
        } catch (Exception $e) {
            Log::error('Failed to update vitalSign: ' . $e->getMessage());
            return new ServiceResult(false, null, "Error:Faild to update vitalSign");
        }
    }


    public function delete(VitalSign $vitalSign)
    {
        try {

            if (!$vitalSign) {
                return new ServiceResult(false, null, "vitalSign not found");
            }
            $vitalSign->delete();
            return new ServiceResult(true, $vitalSign);
        } catch (Exception $e) {
            Log::error('Failed to delete vitalSign: ' . $e->getMessage());
            return new ServiceResult(false, null, "Error:Faild to delete vitalSign");
        }
    }


  public function index(array $filters, User $user): ServiceResult
{
    try {
        $query = VitalSign::query()
            ->filterByRole($user)
            ->when($filters['from'] ?? null && $filters['to'] ?? null, fn($q) =>
                $q->betweenDates($filters['from'], $filters['to'])
            )
            ->when($filters['patient_name'] ?? null, fn($q) =>
                $q->filterByPatientName($filters['patient_name'])
            )
            ->with('patient.user')
            ->orderBy('measured_at', 'desc');

        $perPage = 10;
        $page = request('page', 1);
        $results = $query->paginate($perPage, ['*'], 'page', $page);

        return new ServiceResult(true, $results);

    } catch (\Exception $e) {
        Log::error('Failed to load vital signs: ' . $e->getMessage());
        return new ServiceResult(false, null, 'Failed to fetch data');
    }
}


}
