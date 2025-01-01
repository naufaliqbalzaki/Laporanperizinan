<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Instance extends Model
{
  use HasFactory;

  protected $fillable = [
    'parent_id',
    'name',
    // 'is_active',
    // 'website',
    // 'email',
    // 'image',
    // 'address',
    // 'district',
    // 'city',
    // 'province',
    // 'postal_code'
  ];

  public function parent()
  {
    return $this->belongsTo(Instance::class);
  }

  public function children()
  {
    return $this->hasMany(Instance::class);
  }

  public function users()
  {
    return $this->hasMany(User::class);
  }

  public function documents()
  {
    return $this->hasMany(Document::class);
  }

  public function instance()
  {
    return $this->belongsTo(Instance::class);
  }

  public function instances()
  {
    return $this->hasMany(Instance::class);
  }

  public function deleteImage()
  {
    if ($this->image) {
      Storage::delete('public/instances/' . $this->image);
    }
  }
}
