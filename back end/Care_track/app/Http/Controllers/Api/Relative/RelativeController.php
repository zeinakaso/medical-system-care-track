<?php

namespace App\Http\Controllers\Api\Relative;

use App\Models\Relative;
use Illuminate\Http\Request;
use App\Services\Relative\RelativeService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\Patient\PatientResource;
use App\Http\Resources\Relative\RelativeResource;
use App\Http\Requests\Relative\StoreRelativeRequest;
use App\Http\Requests\Relative\UpdateRelativeRequest;

class RelativeController extends Controller
{
    public function __construct(protected RelativeService $relativeService) {}

    /**
     * Display a listing of relatives with user data
     */
    public function index()
    {
        $relatives = Relative::with('user')->get();

        return RelativeResource::collection($relatives);
    }

    /**
     * Store new relative (linked to user)
     */
    public function store(StoreRelativeRequest $request)
    {
        $relative = $this->relativeService->create($request->validated());

        if ($relative->success) {
            return $this->success([
                'message' => 'relative created successfully',
                'data' => new RelativeResource($relative->data)
            ]);
        }

        return $this->error(null, $relative->message, 401);
    }

    /**
     * Show single relative with user data
     */
    public function show($id): JsonResponse
    {
        $relative = Relative::with(['user', 'patients'])->findOrFail($id);

        return $this->success(new RelativeResource($relative));
    }

    /**
     * Update relative (ONLY relation + phone)
     * name/email MUST be updated from users table
     */
    public function update(UpdateRelativeRequest $request, Relative $relative): JsonResponse
    {
        $result = $this->relativeService->update($relative, $request->validated());

        if (!$result->success) {
            return $this->error(null, $result->message, 401);
        }

        /**
         * Update user data if sent (name/email)
         * IMPORTANT: this keeps sync between tables
         */
        if ($request->has('name') || $request->has('email')) {
            $user = $result->data->user;

            $user->update([
                'name' => $request->name ?? $user->name,
                'email' => $request->email ?? $user->email,
            ]);
        }

        return $this->success([
            'message' => 'relative updated successfully',
            'data' => new RelativeResource($result->data)
        ]);
    }

    /**
     * Delete relative (and user via cascade if enabled)
     */
    public function destroy(Relative $relative)
    {
        $result = $this->relativeService->delete($relative);

        if ($result->success) {
            return $this->success([
                'message' => 'relative deleted successfully'
            ]);
        }

        return $this->error(null, $result->message, 401);
    }

    /**
     * Get patients linked to a relative
     */
    public function showPatientDetails($relativeId)
    {
        $result = $this->relativeService->getPatientDetailsForRelative($relativeId);

        if ($result->success) {
            return self::success(
                PatientResource::collection($result->data),
            );
        }

        return self::error(null, $result->message, 404);
    }
} 