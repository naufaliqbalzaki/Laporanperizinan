<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Periksa jika pengguna belum diverifikasi
        if (Auth::check() && !Auth::user()->hasVerifiedEmail()) {
            return redirect()->route('verification.notice');
        }

        return $next($request);
    }
}
