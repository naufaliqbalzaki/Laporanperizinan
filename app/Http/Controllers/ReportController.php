<?php

namespace App\Http\Controllers;

use App\Http\Requests\DownloadReportRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification; // Tambahkan model Notification
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class ReportController extends Controller
{
    public function index()
    {
        $subjects = DB::table('documents')
            ->select('subject', DB::raw('count(next_action) as approved_total'), DB::raw('count(corrective_action) as corrective_total'))
            ->groupBy('subject')
            ->get();

        foreach ($subjects as $subject) {
            $subject->verification_date = DB::table('documents')
                ->select('verification_date')
                ->where('subject', $subject->subject)
                ->orderBy('verification_date', 'asc')
                ->get();

            $subject->id = DB::table('documents')
                ->select('id')
                ->where('subject', $subject->subject)
                ->orderBy('verification_date', 'asc')
                ->get();

            $subject->total = $subject->approved_total + $subject->corrective_total;
        }
        return Inertia::render('Reports/Index', [
            'subjects' => $subjects,
        ]);
    }

    public function download(DownloadReportRequest $request)
    {
        $ids = $request->input('ids');

        if (empty($ids)) {
            $subjects = DB::table('documents')
                ->select('subject', DB::raw('count(next_action) as approved_total'), DB::raw('count(corrective_action) as corrective_total'))
                ->groupBy('subject')
                ->get();
        } else {
            $subjects = DB::table('documents')
                ->select('subject', DB::raw('count(next_action) as approved_total'), DB::raw('count(corrective_action) as corrective_total'))
                ->whereIn('id', $ids)
                ->groupBy('subject')
                ->get();
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->getColumnDimension('A')->setWidth(7);
        $sheet->getColumnDimension('B')->setWidth(70);
        $sheet->getColumnDimension('C')->setWidth(15);
        $sheet->getColumnDimension('D')->setWidth(15);
        $sheet->getColumnDimension('E')->setWidth(15);

        $sheet->setCellValue('A1', 'No.');
        $sheet->setCellValue('B1', 'Perizinan');
        $sheet->setCellValue('C1', 'Berkas Lanjut');
        $sheet->setCellValue('D1', 'Berkas Kembali');
        $sheet->setCellValue('E1', 'Total');

        $headerStyle = [
            'font' => [
                'bold' => true,
                'size' => 14,
                'color' => [
                    'rgb' => 'FFFFFF'
                ]
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FF137553',
                ],
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];
        $sheet->getStyle('A1:E1')->applyFromArray($headerStyle);
        $sheet->getRowDimension('1')->setRowHeight(30);

        $row = 2;
        foreach ($subjects as $index => $subject) {
            $sheet->setCellValue('A' . $row, $index + 1);
            $sheet->setCellValue('B' . $row, $subject->subject);
            $sheet->setCellValue('C' . $row, $subject->approved_total);
            $sheet->setCellValue('D' . $row, $subject->corrective_total);
            $sheet->setCellValue('E' . $row, ($subject->approved_total + $subject->corrective_total));

            $borderStyle = [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['argb' => 'FF000000'],
                    ],
                ],
            ];

            $sheet->getStyle('A' . $row . ':E' . $row)->applyFromArray($borderStyle);
            $sheet->getStyle('A' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

            $row++;
        }

        $sheet->mergeCells('A' . $row . ':B' . $row);
        $sheet->setCellValue('A' . $row, 'Total');
        $sheet->setCellValue('C' . $row, '=SUM(C2:C' . ($row - 1) . ')');
        $sheet->setCellValue('D' . $row, '=SUM(D2:D' . ($row - 1) . ')');
        $sheet->setCellValue('E' . $row, '=SUM(E2:E' . ($row - 1) . ')');

        $rowStyle = [
            'font' => [
                'bold' => true,
                'color' => [
                    'rgb' => 'FFFFFF'
                ]
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => [
                    'rgb' => '09597F',
                ],
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];
        $sheet->getStyle('A' . $row . ':E' . $row)->applyFromArray($rowStyle);
        $sheet->getStyle('A' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $writer = new Xlsx($spreadsheet);
        $fileName = 'Laporan_Perizinan-' . date('Y-m-d-H-i-s') . '.xlsx';

        $filePath = storage_path('app/public/documents/reports/' . $fileName);

        if (!file_exists(dirname($filePath))) {
            mkdir(dirname($filePath), 0777, true);
        }

        $writer->save($filePath);

        // Tambahkan logika untuk menyimpan notifikasi
        $user = Auth::user(); // Ambil pengguna yang sedang login
        Notification::create([
            'user_id' => $user->id,
            'message' => "{$user->name} Telah Download Laporan Perizinan",
            'read' => false,
        ]);

        return response()->download($filePath)->deleteFileAfterSend(true);
    }
}
