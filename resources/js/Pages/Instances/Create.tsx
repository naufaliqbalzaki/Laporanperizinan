import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import { InstanceForm } from './_form'

export default function CreateInstancePage({
  appUrl,
  auth
}: PageProps) {
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Buat Dinas Baru
          </h2>
        </div>
      }
    >
      <Head title="Buat Dinas Baru" />

      <div className="px-8 mx-auto max-w-[1728px]">
        <InstanceForm appUrl={appUrl} />
      </div>
    </Authenticated>
  )
}
