<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'instance_id',
    'doc_type',
    'number',
    'issue_date',
    'verification_date',
    'subject',
    'from',
    'file',
    'phone',
    'next_action',
    'corrective_action',
    'description',
    'petugas'
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function instance()
  {
    return $this->belongsTo(Instance::class);
  }

  public function deleteFile()
  {
    if ($this->file) {
      Storage::delete('public/documents/' . $this->file);
    }
  }
}
