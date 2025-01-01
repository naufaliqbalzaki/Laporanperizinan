import { DataTable } from '@/Components/table/DataTable'
import { DataTableColumnHeader } from '@/Components/table/DataTableColumnHeader'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head, router } from '@inertiajs/react'
import { DownloadIcon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/Components/ui/alert-dialog'

function generateColumn({
  appUrl,
  onDelete,
  selectedRows,
  setSelectedRows,
  files
}: {
  appUrl: string
  onDelete: (name: string) => void
  selectedRows: any[]
  setSelectedRows: (rows: any[]) => void
  files: any[]
}): ColumnDef<any, any>[] {
  return [
    {
      accessorKey: 'select',
      header: () => (
        <input
          type="checkbox"
          onChange={(e) => {
            const isChecked = e.target.checked
            if (isChecked) {
              setSelectedRows(files) // Pilih semua baris
            } else {
              setSelectedRows([]) // Hapus semua pilihan
            }
          }}
          checked={selectedRows.length === files.length && files.length > 0}
        />
      ),
      cell(props) {
        const isSelected = selectedRows.some(
          (row) => row.name === props.row.original.name
        )
        return (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              const isChecked = e.target.checked
              if (isChecked) {
                setSelectedRows([...selectedRows, props.row.original])
              } else {
                setSelectedRows(
                  selectedRows.filter(
                    (row) => row.name !== props.row.original.name
                  )
                )
              }
            }}
          />
        )
      }
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama File" />
      ),
      cell(props) {
        if (props.row.index === 0) {
          return (
            <>
              {props.getValue()}
              <Badge className="ml-4 bg-green-500 text-foreground">Baru</Badge>
            </>
          )
        } else {
          return <>{props.getValue()}</>
        }
      }
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tanggal Dibuat" />
      ),
      cell(props) {
        const value = props.getValue()
        const date = new Date(value)
        return (
          <span>
            {date.toLocaleString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        )
      }
    },
    {
      accessorKey: 'size',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ukuran" />
      ),
      cell(props) {
        return <span>{(props.getValue() / 1000).toFixed(2)} KB</span>
      }
    },
    {
      accessorKey: 'action',
      header: () => <div className="text-center">Aksi</div>,
      cell(props) {
        return (
          <div className="flex items-center justify-center space-x-2">
            {/* Tombol Download */}
            <Button
              variant="ghost"
              type="button"
              className="bg-blue-500 bg-opacity-5"
              onClick={async () => {
                const res = await axios.get(
                  route('backups.download', props.row.original.name)
                )
                const url = window.URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', props.row.original.name)
                document.body.appendChild(link)
                link.click()
                window.URL.revokeObjectURL(url)
                toast.success('Berhasil mengunduh file.')
              }}
            >
              <DownloadIcon className="w-5 h-5 text-blue-500" />
            </Button>

            {/* Tombol Hapus dengan AlertDialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" type="button" className="bg-red-500 bg-opacity-5">
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda Yakin Ingin Menghapus File <b>{props.row.original.name}</b>?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(props.row.original.name)}
                    className="bg-red-500 text-white"
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      }
    }
  ]
}

export default function BackupIndexPage({
  auth,
  files,
  appUrl,
  flash
}: PageProps & { files: any[] }) {
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const handleDeleteSelectedRows = async () => {
    if (selectedRows.length === 0) return
    try {
      await Promise.all(
        selectedRows.map((file) =>
          axios.delete(route('backups.delete', file.name))
        )
      )
      toast.success(`${selectedRows.length} file berhasil dihapus.`)
      setSelectedRows([])
      router.reload()
    } catch (error) {
      toast.error('Gagal menghapus beberapa file.')
    }
  }

  const handleDelete = async (name: string) => {
    try {
      await axios.delete(route('backups.delete', name))
      toast.success(`File ${name} berhasil dihapus.`)
      router.reload()
    } catch (error) {
      toast.error(`Gagal menghapus file ${name}.`)
    }
  }

  const columns = generateColumn({
    appUrl,
    onDelete: handleDelete,
    selectedRows,
    setSelectedRows,
    files
  })

  useEffect(() => {
    toast.dismiss()
    if (flash?.success) {
      toast.success(flash.success)
    }
    if (flash?.error) {
      toast.error(flash.error)
    }
  }, [flash])

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
              Backup Data
            </h2>
            <Button onClick={() => router.visit(route('backups.create'))}>
              Buat Backup
            </Button>
          </div>
          {selectedRows.length > 0 && (
            <div className="flex justify-end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="h-8">
                    Hapus {selectedRows.length} Baris Terpilih
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus {selectedRows.length} Baris Terpilih</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah Anda Yakin Ingin Menghapus {selectedRows.length} File Terpilih?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteSelectedRows}
                      className="bg-red-500 text-white"
                    >
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      }
    >
      <Head title="Backup" />
      <div className="px-8 pb-8 mx-auto max-w-[1728px]">
        <DataTable
          columns={columns}
          data={files}
          showToolbar={false}
        />
      </div>
    </Authenticated>
  )
}
