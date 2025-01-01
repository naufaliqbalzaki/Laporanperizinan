<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\InstanceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\Document;
use App\Models\Instance;
use App\Models\Notification;
use Inertia\Inertia;

// Redirect root to dashboard
Route::redirect('/', '/dashboard');

// Routes for email verification
Route::get('/email/verify', [EmailVerificationPromptController::class, 'show'])
    ->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Routes for Forgot Password and Reset Password
Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.update');

// Middleware 'verified' to secure access to the dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $doc_central = Document::where('doc_type', 'central')->get();
        $doc_east = Document::where('doc_type', 'east')->get();

        $instances = Instance::latest()->get();

        $data = [
            'doc_central' => [
                'name' => 'Berkas Masuk PTSP Pusat',
                'data' => $doc_central,
                'unit' => 'Berkas PTSP Pusat'
            ],
            'doc_east' => [
                'name' => 'Berkas Masuk UPTSA Timur',
                'data' => $doc_east,
                'unit' => 'Berkas UPTSA Timur'
            ],
            'instance_active' => [
                'name' => 'Dinas',
                'data' => $instances,
                'unit' => 'Total Dinas'
            ],
        ];

        return Inertia::render('Dashboard', [
            'data' => $data
        ]);
    })->name('dashboard');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Instances routes
    Route::resource('instances', InstanceController::class);
    Route::post('/instances/destroy_batch', [InstanceController::class, 'destroyBatch'])->name('instances.destroy_batch');

    // Documents routes
    Route::resource('documents', DocumentController::class);
    Route::post('/documents/import', [DocumentController::class, 'import'])->name('documents.import');
    Route::get('/documents/file/export/{doc_type}', [DocumentController::class, 'export'])->name('documents.file.export');
    Route::post('/documents/destroy_batch', [DocumentController::class, 'destroyBatch'])->name('documents.destroy_batch');
    Route::get('/download-template', [DocumentController::class, 'download_template'])->name('documents.download_template');

    // Tambahkan route untuk menangani notifikasi export
    Route::post('/documents/export', function (\Illuminate\Http\Request $request) {
        $user = Auth::user();
        $docType = $request->input('doc_type'); // Dapatkan doc_type dari request
        $count = $request->input('count'); // Dapatkan jumlah dokumen

        Notification::create([
            'user_id' => $user->id,
            'message' => "{$user->name} telah men-download dokumen sebanyak {$count} berkas di " . ($docType == 'central' ? 'PTSP Pusat' : 'UPTSA Timur'),
            'read' => false,
        ]);

        return response()->json(['message' => 'Notifikasi export berhasil disimpan']);
    })->name('documents.export.notify');

    // Backup routes
    Route::get('/backups', [BackupController::class, 'index'])->name('backups.index');
    Route::get('/backups/create', [BackupController::class, 'create'])->name('backups.create');
    Route::get('/backups/download/{name}', [BackupController::class, 'download'])->name('backups.download');
    Route::delete('/backups/{name}', [BackupController::class, 'destroy'])->name('backups.delete');

    // Report routes
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/download', [ReportController::class, 'download'])->name('reports.download');

    // Notification routes
    Route::get('/notifications', function () {
        $notifications = Notification::where('user_id', Auth::id())
            ->latest()
            ->get(['message', 'created_at', 'read'])
            ->map(function ($notification) {
                return [
                    'message' => $notification->message,
                    'formatted_date_time' => $notification->created_at->format('d F Y, H:i:s'),
                    'read' => $notification->read,
                ];
            });

        $unreadCount = $notifications->where('read', false)->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unreadCount
        ]);
    })->middleware('auth');

    Route::get('/api/notifications/unread-count', function () {
        $userId = Auth::id();
        return response()->json(['unreadCount' => Notification::where('user_id', $userId)->where('read', false)->count()]);
    });

    Route::post('/notifications/mark-read', function () {
        $userId = Auth::id();
        Notification::where('user_id', $userId)->update(['read' => true]);
        return response()->json(['success' => true]);
    });
});

require __DIR__ . '/auth.php';
