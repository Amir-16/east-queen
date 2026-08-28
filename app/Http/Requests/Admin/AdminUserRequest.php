<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AdminUserRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $id      = $this->route('user');
        $isEdit  = $id !== null;

        return [
            'name'                  => 'required|string|max:120',
            'email'                 => "required|email|max:255|unique:users,email,{$id}",
            'password'              => $isEdit ? 'nullable|string|min:8|confirmed' : 'required|string|min:8|confirmed',
            'password_confirmation' => 'nullable|string',
        ];
    }
}
