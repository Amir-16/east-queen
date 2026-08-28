<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::where('is_admin', true)
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'created_at']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(AdminUserRequest $request): RedirectResponse
    {
        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => true,
        ]);

        return redirect()->route('admin.users.index')
            ->with('flash.success', "Admin user \"{$request->name}\" created.");
    }

    public function edit($user): Response
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => User::where('is_admin', true)
                ->findOrFail($user, ['id', 'name', 'email', 'created_at']),
        ]);
    }

    public function update(AdminUserRequest $request, $user): RedirectResponse
    {
        $model = User::where('is_admin', true)->findOrFail($user);

        $data = [
            'name'  => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $model->update($data);

        return redirect()->route('admin.users.index')
            ->with('flash.success', "User \"{$model->name}\" updated.");
    }

    public function destroy($user): RedirectResponse
    {
        $model = User::where('is_admin', true)->findOrFail($user);

        if ($model->id === auth()->id()) {
            return back()->with('flash.error', 'You cannot delete your own account.');
        }

        $name = $model->name;
        $model->delete();

        return redirect()->route('admin.users.index')
            ->with('flash.success', "\"{$name}\" removed.");
    }
}
