<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class BackupController extends Controller
{
    public function index()
    {
        // Membuat folder backup jika belum ada
        $backupPath = storage_path('db-backup');
        if (!file_exists($backupPath)) {
            mkdir($backupPath, 0777, true);
        }

        // Mengambil daftar file backup
        $files = array_diff(scandir($backupPath), ['.', '..']);
        $files = array_map(function ($file) use ($backupPath) {
            $filePath = $backupPath . '/' . $file;
            return [
                'no' => 1,
                'name' => $file,
                'size' => filesize($filePath),
                'created_at' => date('Y-m-d H:i:s', filectime($filePath)),
                'new' => strtotime(date('Y-m-d H:i:s', filectime($filePath))) > strtotime('-24 hours'),
            ];
        }, $files);

        // Mengurutkan berdasarkan waktu pembuatan (terbaru di atas)
        usort($files, function ($a, $b) {
            return $b['created_at'] <=> $a['created_at'];
        });

        return Inertia::render('Backup/Index', [
            'files' => $files
        ]);
    }

    public function create()
    {
        // Membuat nama file backup dengan hash
        $name = substr(md5(rand()), 0, 6);
        $backupPath = storage_path('db-backup');
        $backupFile = $backupPath . "/db-laporan-" . $name . ".sql";

        // Membuat folder jika belum ada
        if (!file_exists($backupPath)) {
            mkdir($backupPath, 0777, true);
        }

        // Menjalankan perintah mysqldump
        $command = sprintf(
            '"C:\\xampp\\mysql\\bin\\mysqldump.exe" -u%s -p%s %s --password=%s > %s',
            escapeshellarg(env('DB_USERNAME')),
            escapeshellarg(env('DB_PASSWORD')),
            escapeshellarg(env('DB_DATABASE')),
            escapeshellarg(env('DB_PASSWORD')),
            escapeshellarg($backupFile)
        );

        Log::info('Executing backup command: ' . $command); // Log untuk debugging

        // Eksekusi command
        $output = [];
        $returnVar = null;
        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            // Jika terjadi error
            Log::error('Backup failed: ' . implode("\n", $output));
            return redirect()->route('backups.index')->with('error', 'Backup Gagal. Periksa Konfigurasi Atau Server.');
        }

        return redirect()->route('backups.index')->with('success', 'Backup Database Berhasil Dibuat');
    }

    public function download($name)
    {
        $backupPath = storage_path('db-backup');
        $file = $backupPath . '/' . $name;

        if (!file_exists($file)) {
            return redirect()->route('backups.index')->with('error', 'File Backup Tidak Ditemukan.');
        }

        return response()->download($file, $name, [
            'Content-Type' => 'application/sql',
        ]);
    }

    public function destroy($name)
    {
        $backupPath = storage_path('db-backup');
        $file = $backupPath . '/' . $name;

        if (!file_exists($file)) {
            return response()->json(['message' => 'File Tidak Ditemukan.'], 404);
        }

        try {
            unlink($file); // Menghapus file
            return response()->json(['message' => 'File Berhasil Dihapus.'], 200);
        } catch (\Exception $e) {
            Log::error('Gagal menghapus file: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal Menghapus File.'], 500);
        }
    }
}
