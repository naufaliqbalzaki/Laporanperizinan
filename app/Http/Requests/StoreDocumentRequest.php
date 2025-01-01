<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreDocumentRequest extends FormRequest
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
      'user_id' => ['required', 'integer'],
      'instance_id' => ['required', 'string'],
      'doc_type' => ['required', 'string'],
      'number' => ['required', 'string',],
      'issue_date' => ['required', 'date'],
      'verification_date' => ['required', 'date'],
      'subject' => ['required', 'string'],
      'from' => ['required', 'string'],
      'file' => [
        'nullable',
        'file',
      ],
      'phone' => ['required', 'string'],
      'next_action' => ['nullable', 'string'],
      'corrective_action' => ['nullable', 'string'],
      'description' => ['nullable', 'string'],
      'petugas' => ['nullable', 'string']
    ];
  }
}
