import InputError from '@/Components/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useEffect } from 'react'
import { toast } from 'sonner'

export default function UpdateProfileInformation({
  className = ''
}: {
  className?: string
}) {
  const user = usePage<PageProps>().props.auth.user
  const flash = usePage<PageProps>().props.flash

  useEffect(() => {
    toast.dismiss()
    if (flash?.success) {
      toast.success(flash.success)
    }

    if (flash?.error) {
      toast.error(flash.error)
    }
  }, [flash])

  const { data, setData, patch, errors, processing } = useForm({
    name: user.name,
    username: user.username
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('profile.update'))
  }

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Informasi Profil
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update Informasi Profil Anda Dan Username.
        </p>
      </header>

      <form onSubmit={submit} className="h-full mt-6 space-y-6">
        <div>
          <Label htmlFor="name">Nama</Label>

          <Input
            id="name"
            className="block w-full mt-1"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="username">Username</Label>

          <Input
            id="username"
            type="username"
            className="block w-full mt-1"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.username} />
        </div>

        <div className="">
          <Button
            disabled={processing}
            className="absolute bottom-75 w-full"
          >
            Simpan
          </Button>
        </div>
      </form>
    </section>
  )
}
