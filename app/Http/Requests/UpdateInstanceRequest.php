<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateInstanceRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Auth::check();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'parent_id' => ['nullable', 'integer'],
      'name' => ['required', 'string'],
      // 'is_active' => ['required', 'boolean'],
      // 'website' => ['nullable', 'string'],
      // 'email' => ['required', 'email'],
      // 'image' => ['nullable', Rule::when(
      //   $this->hasFile('image'),
      //   ['image']
      // )],
      // 'address' => ['required', 'string'],
      // 'district' => ['required', 'string'],
      // 'city' => ['required', 'string'],
      // 'province' => ['required', 'string'],
      // 'postal_code' => ['required', 'string']
    ];
  }
}
