import InputError from '@/Components/InputError'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/Components/ui/alert-dialog'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { router, useForm } from '@inertiajs/react'
import { UploadIcon } from '@radix-ui/react-icons'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export const ImportForm = ({
  doc_type,
  importOpen,
  setImportOpen
}: {
  doc_type: string

  importOpen: boolean
  setImportOpen: (open: boolean) => void
}) => {
  const { data, setData, post, processing, errors } = useForm<{
    xlsx: File | null
    doc_type: string
    type: string
  }>({
    xlsx: null,
    doc_type: doc_type,
    type: ''
  })

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (data.xlsx === null)
      toast.error('Tolong Pilih File XLSX Yang Akan Diimport.')
    toast.loading('Mengimport dokumen...')
    post(route('documents.import'), {
      forceFormData: true,
      onSuccess: () => {
        router.reload()
      },
      onFinish: () => {
        router.reload()
      }
    })
  }

  return (
    <AlertDialog
      open={importOpen}
      onOpenChange={(open) => setImportOpen(open)}
    >
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <UploadIcon className="w-5 h-5" />
          Import
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Import Documents (xlsx)</AlertDialogTitle>
          <AlertDialogDescription>
          Import Dokumen Menggunakan Template Yang Telah Disediakan.{' '}
            <a
              href={route('documents.download_template')}
              className="text-blue-500"
            >
              Unduh Template
            </a>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={submit}>
          <div className="mt-4">
            <div className="mt-4">
              <Label className="mb-1" htmlFor="xlsx">
                Pilih File XLSX
              </Label>
              <Input
                id="xlsx"
                name="xlsx"
                type="file"
                className="file:text-foreground"
                accept=".xlsx"
                onChange={(e) => {
                  if (e.target.files) {
                    setData('xlsx', e.target.files[0])
                  }
                }}
              />
              <InputError message={errors.xlsx} className="mt-2" />
            </div>
            <div className="mt-4">
              <Input
                id="doc_type"
                name="doc_type"
                type="hidden"
                value={doc_type}
                className="hidden"
              />

              <InputError
                message={errors.doc_type}
                className="mt-2"
              />
            </div>
          </div>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel disabled={processing}>
              Batal
            </AlertDialogCancel>
            <Button type="submit" disabled={processing}>
              Import
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
