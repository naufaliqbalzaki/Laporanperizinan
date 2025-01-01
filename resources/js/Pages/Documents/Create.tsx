import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Instance, PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { DocumentForm } from './_form'

export default function CreateDocumentPage({
  appUrl,
  auth,
  instances
}: PageProps & {
  appUrl: string
  instances: Instance[]
}) {
  const [docType, setType] = useState('central')

  useEffect(() => {
    const nowUrl = new URL(window.location.href)

    const docTypeParam = nowUrl.searchParams.get('type')

    if (docTypeParam) {
      setType(docTypeParam)
    }
  }, [])

  const type = docType === 'central' ? ' Pusat' : ' Timur'

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Buat Berkas Masuk
            {type}
          </h2>
        </div>
      }
    >
      <Head title={`Buat Berkas Masuk ${type}`} />

      <div className="px-8 mx-auto max-w-[1728px]">
        <DocumentForm
          userId={auth.user.id}
          docType={docType}
          instances={instances}
        />
      </div>
    </Authenticated>
  )
}
