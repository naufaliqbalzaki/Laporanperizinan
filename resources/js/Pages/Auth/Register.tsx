import InputError from '@/Components/InputError'
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
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    username: '',
    email: '', // Kolom email baru
    password: '',
    password_confirmation: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('register'), {
      onBefore: () => {
        toast.dismiss()
        toast.loading('Processing...')
      },
      onError: (error) => {
        console.error(error)
        toast.dismiss()
        if (error.name) {
          toast.error(error.name)
        }
        if (error.username) {
          toast.error(error.username)
        }
        if (error.email) {
          toast.error(error.email)
        }
        if (error.password) {
          toast.error(error.password)
        }
        if (error.password_confirmation) {
          toast.error(error.password_confirmation)
        }
      },
      onSuccess: () => {
        toast.dismiss()
        toast.success('Akun Berhasil Dibuat!')
      }
    })
  }

  return (
    <GuestLayout>
      <Head title="Daftar" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Daftar</CardTitle>
          <CardDescription>
            Masukkan Data Diri Anda Untuk Membuat Akun Baru.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <form onSubmit={submit}>
            <div>
              <Label htmlFor="name">Nama</Label>

              <Input
                id="name"
                name="name"
                value={data.name}
                className="block w-full mt-1"
                autoComplete="name"
                onChange={(e) => setData('name', e.target.value)}
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
              <Label htmlFor="username">Username</Label>

              <Input
                id="username"
                type="text"
                name="username"
                value={data.username}
                className="block w-full mt-1"
                autoComplete="additional-name"
                onChange={(e) => setData('username', e.target.value)}
                required
              />

              <InputError message={errors.username} className="mt-2" />
            </div>

            {/* Kolom email baru */}
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="block w-full mt-1"
                autoComplete="email"
                onChange={(e) => setData('email', e.target.value)}
                required
              />

              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
              <Label htmlFor="password">Kata Sandi</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={data.password}
                  className="block w-full mt-1 pr-10"
                  autoComplete="new-password"
                  onChange={(e) => setData('password', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
              <Label htmlFor="password_confirmation">
                Konfirmasi Kata Sandi
              </Label>

              <div className="relative">
                <Input
                  id="password_confirmation"
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="block w-full mt-1 pr-10"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  {showPasswordConfirmation ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sudah Punya Akun?{' '}
                <Link
                  href={route('login')}
                  className="text-sm text-blue-600 underline"
                >
                  Masuk
                </Link>
              </p>
            </div>
            <Button className="w-full mt-4" disabled={processing}>
              Daftar
            </Button>
          </form>
        </CardContent>
      </Card>
    </GuestLayout>
  )
}
