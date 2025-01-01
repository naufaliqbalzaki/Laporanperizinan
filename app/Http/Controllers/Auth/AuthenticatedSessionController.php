<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $loginInput = $request->input('login');
        $password = $request->input('password');

        // Cek apakah user ada berdasarkan email, username, atau name
        $user = User::where('email', $loginInput)
                    ->orWhere('username', $loginInput)
                    ->orWhere('name', $loginInput)
                    ->first();

        // Jika user tidak ditemukan, kembali ke halaman login dengan pesan error
        if (!$user) {
            return back()->withErrors([
                'login' => 'Username atau Email Yang Diberikan Belum Terdaftar.',
            ]);
        }

        // Autentikasi menggunakan email dari user yang ditemukan
        if (!Auth::attempt(['email' => $user->email, 'password' => $password], $request->filled('remember'))) {
            return back()->withErrors([
                'password' => 'Kata Sandi Tidak Sesuai.',
            ]);
        }

        // Jika autentikasi berhasil, regenerasi sesi dan arahkan ke dashboard
        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
