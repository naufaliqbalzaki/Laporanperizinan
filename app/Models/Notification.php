<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Notification extends Model
{
    use HasFactory;

    // Tentukan kolom yang dapat diisi (mass assignable)
    protected $fillable = [
        'user_id',
        'message',
        'read',
    ];

    // Relasi ke model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope untuk notifikasi yang belum dibaca
    public function scopeUnread($query)
    {
        return $query->where('read', false);
    }

    // Scope untuk notifikasi terbaru
    public function scopeLatestNotifications($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    // Menandai notifikasi sebagai sudah dibaca
    public function markAsRead()
    {
        $this->read = true;
        $this->save();
    }

    // Menandai semua notifikasi sebagai sudah dibaca untuk pengguna saat ini
    public static function markAllAsRead(Request $request)
    {
        self::where('user_id', Auth::id())->where('read', false)->update(['read' => true]);
        return response()->json(['status' => 'success']);
    }

    // Accessor untuk format tanggal dan waktu
    public function getFormattedDateTimeAttribute()
    {
        return $this->created_at->format('d F Y, H:i:s'); // Contoh: 15 November 2024, 14:35:20
    }

    // Membuat notifikasi baru
    public static function createNotification($userId, $message)
    {
        return self::create([
            'user_id' => $userId,
            'message' => $message,
            'read' => false,
        ]);
    }

    // Menyimpan notifikasi dengan data pengguna yang sedang login
    public static function createForLoggedInUser($message)
    {
        $userId = Auth::id(); // Mendapatkan ID pengguna saat ini
        if ($userId) {
            return self::createNotification($userId, $message);
        }
        return null;
    }
}
