import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

export default function Edit({
  auth,
  mustVerifyEmail,
  status
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Profil
          </h2>
        </div>
      }
    >
      <Head title="Profil" />

      <div className="px-8 pb-8 mx-auto max-w-[1728px] grid md:grid-cols-2 grid-cols-1 gap-8">
        <div className="p-4 shadow sm:p-8 sm:rounded-lg">
          <UpdateProfileInformationForm className="relative h-full max-w-lg" />
        </div>
        <div className="p-4 shadow sm:p-8 sm:rounded-lg">
          <UpdatePasswordForm className="relative h-full max-w-lg" />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
