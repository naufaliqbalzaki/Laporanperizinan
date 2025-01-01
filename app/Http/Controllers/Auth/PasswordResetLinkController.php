<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     *
     * @return Response
     */
    public function create(): Response
    {
        // Menampilkan halaman "Forgot Password" dengan status dari sesi (jika ada).
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @param Request $request
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validasi input email, memastikan bahwa email diisi dan dalam format yang benar.
        $request->validate([
            'email' => 'required|email',
        ]);

        // Mengirim link reset password ke email pengguna.
        $status = Password::sendResetLink($request->only('email'));

        // Jika link berhasil dikirim, kembali dengan status keberhasilan.
        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        // Jika terjadi error, kirim pesan error untuk ditampilkan pada form.
        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
