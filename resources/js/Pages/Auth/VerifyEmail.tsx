import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});
  const [isVerified, setIsVerified] = useState(false);

  // Ambil data pengguna dari server melalui usePage
  const { props } = usePage<{ auth: { user: { email_verified_at: string | null } } }>();
  const user = props.auth.user;

  useEffect(() => {
    // Cek apakah user sudah terverifikasi
    if (user && user.email_verified_at) {
      setIsVerified(true);
    }
  }, [user]);

  useEffect(() => {
    // Jika terverifikasi, redirect ke dashboard
    if (isVerified) {
      window.location.href = '/dashboard';
    }
  }, [isVerified]);

  // Function untuk mengirim ulang email verifikasi
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        Thanks For Signing Up! Before Getting Started, Could You Verify Your Email Address By Clicking On The Link We Just Emailed To You? If You Didn't Receive The Email, We Will Gladly Send You Another.
      </div>


      {status === 'verification-link-sent' && (
        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          A New Verification Link Has Been Sent To The Email Address You Provided During Registration.
        </div>
      )}

      {!isVerified ? (
        <form onSubmit={submit}>
          <div className="mt-4">
            <Button disabled={processing}>
              {processing ? 'Sending...' : 'Resend Verification Email'}
            </Button>
          </div>

          <div className="mt-4 flex justify-center">
            <Link
              href={route('logout')}
              method="post"
              as="button"
              className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Log Out
            </Link>
          </div>
        </form>
      ) : (
        <p>Verifikasi Berhasil, Mengarahkan Ke Dashboard...</p>
      )}
    </GuestLayout>
  );
}
