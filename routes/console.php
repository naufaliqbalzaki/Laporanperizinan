<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Tambahkan command untuk backup
Artisan::command('backup:run', function () {
    try {
        $backupDir = storage_path('db-backup');
        if (!file_exists($backupDir)) {
            mkdir($backupDir, 0777, true);
        }

        $filename = 'backup-' . date('Y-m-d-H-i-s') . '.sql';
        $path = $backupDir . DIRECTORY_SEPARATOR . $filename;

        // Sesuaikan path `mysqldump` dengan environment server
        $mysqldumpPath = "C:\\xampp\\mysql\\bin\\mysqldump.exe";

        // Buat command untuk backup
        $command = sprintf(
            '"%s" -u%s -p%s %s > "%s"',
            $mysqldumpPath,
            env('DB_USERNAME'),
            env('DB_PASSWORD'),
            env('DB_DATABASE'),
            $path
        );

        exec($command, $output, $returnVar);

        if ($returnVar === 0) {
            Log::info('Backup created successfully: ' . $filename);
            $this->info('Backup Berhasil Dibuat: ' . $filename);
        } else {
            throw new \Exception('Backup Gagal. Silakan Periksa Konfigurasi mysqldump.');
        }
    } catch (\Exception $e) {
        Log::error('Backup error: ' . $e->getMessage());
        $this->error('Terjadi Kesalahan Saat Membuat Backup: ' . $e->getMessage());
    }
})->describe('Create a backup of the database');

// Gunakan `schedule` untuk menjalankan backup secara berkala
Artisan::command('schedule:run', function () {
    $this->call('backup:run');
})->describe('Run scheduled commands');
