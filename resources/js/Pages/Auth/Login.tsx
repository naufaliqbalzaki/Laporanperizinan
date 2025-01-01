import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import GuestLayout from '@/Layouts/GuestLayout'
import { FormEventHandler, useEffect, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import { Button } from '@/Components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Separator } from '@/Components/ui/separator'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({
  status,
  canResetPassword
}: {
  status?: string
  canResetPassword: boolean
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    login: '',
    password: '',
    remember: false
  })

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head title="Login" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <Card className="w-[400px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Silahkan Login Untuk Mengakses Aplikasi Ini.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <form onSubmit={submit}>
            <div>
              <Label htmlFor="login">Username / Email</Label>

              <Input
                id="login"
                type="text"
                name="login"
                value={data.login}
                className="block w-full mt-1"
                autoComplete="username"
                onChange={(e) => setData('login', e.target.value)}
              />

              {errors.login && (
                <InputError message="Username / Email Yang Diberikan Belum Terdaftar." className="mt-2" />
              )}
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Kata Sandi</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={data.password}
                  className="block w-full mt-1"
                  autoComplete="current-password"
                  onChange={(e) => setData('password', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <InputError message="Kata Sandi Tidak Sesuai." className="mt-2" />
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) =>
                    setData('remember', e.target.checked)
                  }
                />
                <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                  Ingat Saya
                </span>
              </label>{' '}
              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Lupa Kata Sandi?
                </Link>
              )}
            </div>
            <div className="flex items-center justify-end mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Belum Punya Akun?{' '}
                <Link
                  href={route('register')}
                  className="text-sm text-blue-600 underline "
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>
            <Button className="w-full mt-4" disabled={processing}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </GuestLayout>
  )
}
