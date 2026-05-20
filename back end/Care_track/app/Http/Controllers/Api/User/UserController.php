<?php

namespace App\Http\Controllers\Api\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\User\UserService;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    // ================= GET ALL USERS =================
    public function index()
    {
        $users = User::select('id','name', 'email','role')->get();
        return UserResource::collection($users);
    }

    // ================= CREATE USER =================
    public function store(StoreUserRequest $request)
    {
        $result = $this->userService->create($request->validated());

        if (!$result->success) {
            return $this->error(null, $result->message, 401);
        }

        $user = $result->data;

        // 🔥 إنشاء profile حسب الدور
        $this->createRoleProfile($user);

        return $this->success([
            'message' => 'User created successfully with role profile',
            'data' => new UserResource($user)
        ]);
    }

    // ================= SHOW USER =================
    public function show(int $id)
    {
        $result = $this->userService->getUser($id);

        if (!$result->success) {
            return $this->error(null, $result->message, 404);
        }

        return $this->success([
            'message' => 'Selected user',
            'data' => new UserResource($result->data)
        ]);
    }

    // ================= UPDATE USER =================
    public function update(UpdateUserRequest $request, User $user)
    {
        $oldRole = $user->role;

        $result = $this->userService->update($user, $request->validated());

        if (!$result->success) {
            return $this->error(null, $result->message, 401);
        }

        $updatedUser = $result->data;
        $newRole = $updatedUser->role;

        // 🔥 إذا تغير الدور → مزامنة الجداول
        if ($oldRole !== $newRole) {

            $this->deleteOldRoleProfile($updatedUser->id, $oldRole);
            $this->createRoleProfile($updatedUser);
        }

        return $this->success([
            'message' => 'User updated successfully with role sync',
            'data' => new UserResource($updatedUser)
        ]);
    }

    // ================= DELETE USER =================
    public function destroy(User $user)
    {
        // 🔥 حذف من كل الجداول المرتبطة
        $this->deleteAllProfiles($user->id);

        $result = $this->userService->delete($user);

        return $result->success
            ? $this->success([
                'message' => 'User deleted successfully',
                'data' => new UserResource($result->data)
            ])
            : $this->error(null, $result->message, 401);
    }

    // ================= STATS =================
    public function stats()
    {
        return response()->json([
            'patients' => \App\Models\Patient::count(),
            'doctors' => \App\Models\Doctor::count(),
            'relatives' => \App\Models\Relative::count(),
            'users' => \App\Models\User::count(),
        ]);
    }

    // =====================================================
    // 🔥 HELPER FUNCTIONS (احترافية)
    // =====================================================

    private function createRoleProfile($user)
    {
        switch ($user->role) {

            case 'doctor':
                app(\App\Services\Doctor\DoctorService::class)->create([
                    'user_id' => $user->id,
                    'Specialization' => 'General',
                    'phone_number' => '0000000000',
                ]);
                break;

            case 'patient':
                app(\App\Services\Patient\PatientService::class)->create([
                    'user_id' => $user->id,
                    'relative_id' => null,
                    'gender' => 'unknown',
                    'birth_date' => now()->toDateString(),
                    'notes' => 'No notes yet',
                    'blood_clique_id' => null,
                ]);
                break;

            case 'relative':
                app(\App\Services\Relative\RelativeService::class)->create([
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'relation' => 'unspecified',
                    'phone' => 'N/A',
                    'email' => $user->email,
                ]);
                break;
        }
    }

    private function deleteOldRoleProfile($userId, $role)
    {
        switch ($role) {

            case 'doctor':
                \App\Models\Doctor::where('user_id', $userId)->delete();
                break;

            case 'patient':
                \App\Models\Patient::where('user_id', $userId)->delete();
                break;

            case 'relative':
                \App\Models\Relative::where('user_id', $userId)->delete();
                break;
        }
    }

    private function deleteAllProfiles($userId)
    {
        \App\Models\Doctor::where('user_id', $userId)->delete();
        \App\Models\Patient::where('user_id', $userId)->delete();
        \App\Models\Relative::where('user_id', $userId)->delete();
    }
}