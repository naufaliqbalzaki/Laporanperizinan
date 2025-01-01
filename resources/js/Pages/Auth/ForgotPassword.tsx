import InputError from '@/Components/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function ForgotPassword({
  status
}: {
  status?: string
}) {
  const { data, setData, post, processing, errors } = useForm({
    email: ''
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('password.email'))
  }

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Forgot Your Password? No Problem, Just Let Us Know Your Email
        Address And We Will Email You A Password Reset Link That Will
        Allow You To Choose A New One.
      </div>

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <Input
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="block w-full mt-1"
          onChange={(e) => setData('email', e.target.value)}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="flex items-center justify-end mt-4">
          <Button className="ms-4" disabled={processing}>
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </GuestLayout>
  )
}