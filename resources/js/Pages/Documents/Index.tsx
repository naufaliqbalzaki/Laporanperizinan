import { DataTable } from '@/Components/table/DataTable'
import { DataTableColumnHeader } from '@/Components/table/DataTableColumnHeader'
import { DataTableRowActions } from '@/Components/table/DataTableRowActions'
import { Button } from '@/Components/ui/button'
import { Checkbox } from '@/Components/ui/checkbox'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/Components/ui/tabs'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Document, PageProps } from '@/types'
import { Head, router } from '@inertiajs/react'
import {
  CheckIcon,
  CrossCircledIcon,
  DownloadIcon,
  PlusIcon
} from '@radix-ui/react-icons'
import { ColumnDef, RowModel } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ImportForm } from './_import_form'

function generateAllColumn({
  appUrl
}: {
  appUrl: string
}): ColumnDef<Document, any>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'number',
      meta: 'No. Online',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="No. Online" />
      )
    },
    {
      accessorKey: 'from',
      meta: 'Nama Pemohon',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama Pemohon" />
      ),
      cell(props) {
        const text: string = props.getValue()
        if (text.length > 50) {
          return text.slice(0, 50) + '...'
        } else {
          return text
        }
      }
    },
    {
      accessorKey: 'instance_name',
      meta: 'Dinas',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dinas" />
      )
    },
    {
      accessorKey: 'subject',
      meta: 'Perizinan',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Perizinan" />
      ),
      cell(props) {
        const text: string = props.getValue()
        if (text.length > 100) {
          return text.slice(0, 100) + '...'
        } else {
          return text
        }
      }
    },
    {
      accessorKey: 'issue_date',
      meta: 'Tanggal Terbit',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Tanggal Terbit"
        />
      ),
      filterFn: 'dateRangeFilter',
      cell(props) {
        const date = new Date(props.getValue())
        return date.toLocaleString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    },
    {
      accessorKey: 'verification_date',
      meta: 'Tanggal Verifikasi',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Tanggal Verifikasi"
        />
      ),
      filterFn: 'dateRangeFilter',
      cell(props) {
        const date = new Date(props.getValue())
        return date.toLocaleString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    },
    {
      accessorKey: 'is_next',
      meta: 'Status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.next_action ? 'Lanjut' : 'Kembali'
        return (
          <div className="flex items-center justify-center gap-2">
            <p
              className={`text-${status === 'Lanjut' ? 'green' : 'red'}-500`}
            >
              {status}
            </p>
            {status === 'Lanjut' ? (
              <CheckIcon className="text-green-500 size-4" />
            ) : (
              <CrossCircledIcon className="text-red-500 size-4" />
            )}
          </div>
        )
      }
    },
    {
      id: 'actions',
      header() {
        return <div className="text-center">Aksi</div>
      },
      cell: ({ row }) => (
        <DataTableRowActions row={row} name="documents" />
      )
    }
  ]
}

function generateSummaryColumn(): ColumnDef<any, any>[] {
  return [
    {
      accessorKey: 'from',
      meta: 'Nama Pemohon',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama Pemohon" />
      ),
    },
    {
      accessorKey: 'subject',
      meta: 'Perizinan',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Perizinan" />
      ),
    },
    {
      accessorKey: 'issue_date',
      meta: 'Tanggal Terbit',
      header: '',
      filterFn: 'dateRangeFilter',
      cell(props) {
        return null
      }
    },
    {
      accessorKey: 'verification_date',
      meta: 'Tanggal Verifikasi',
      header: '',
      filterFn: 'dateRangeFilter',
      cell(props) {
        return null
      }
    },
    {
      accessorKey: 'corrective_action_count',
      meta: 'Jumlah Berkas Kembali',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jumlah Berkas Kembali" />
      ),
      cell(props) {
        const data = props.getValue()
        if (data === 0) {
          return '-'
        } else {
          return data + ' Kali'
        }
      }
    },
    {
      accessorKey: 'corrective_action_last_date',
      meta: 'Tanggal Terakhir Perbaikan',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tanggal Terakhir Perbaikan" />
      ),
      cell(props) {
        const data = props.getValue()
        if (data) {
          const date = new Date(data)
          return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        } else {
          return '-'
        }
      }
    }
  ]
}

export default function DocumentsPage({
  appUrl,
  auth,
  doc_type,
  documents,
  summary,
  flash
}: PageProps & {
  documents: Document[]
  doc_type: string
  summary: any
}) {
  const [importOpen, setImportOpen] = useState(false)
  const allColumns = generateAllColumn({ appUrl })
  const sumColumns = generateSummaryColumn()
  const [filteredData, setFilteredData] = useState<
    RowModel<any> | undefined
  >(undefined)

  useEffect(() => {
    setImportOpen(false)
    toast.dismiss()
    if (flash?.success) {
      toast.success(flash.success)
    }

    if (flash?.error) {
      toast.error(flash.error)
    }
  }, [flash])
  const doc_length = documents.length
  const type =
    doc_type === 'central'
      ? ` Pusat (${doc_length})`
      : ` Timur (${doc_length})`

  if (typeof summary === 'object') {
    summary = Object.keys(summary).map((key) => summary[key])
  }

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Berkas Masuk
            {type}
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={route('documents.file.export', {
                doc_type: doc_type,
                ids: filteredData?.rows.map((row: any) =>
                  parseInt(row.original.id)
                )
              })}
            >
              <Button variant="secondary" type="button">
                <DownloadIcon className="w-5 h-5" />
                Export
              </Button>
            </a>
            <ImportForm
              doc_type={doc_type}
              setImportOpen={setImportOpen}
              importOpen={importOpen}
            />
            <Button
              className="flex items-center gap-2"
              onClick={() =>
                router.visit(`/documents/create?type=${doc_type}`)
              }
            >
              <PlusIcon className="w-5 h-5" />
              Buat Baru
            </Button>
          </div>
        </div>
      }
    >
      <Head title={`Berkas Masuk ${type}`} />

      <div className="px-8 pb-8 mx-auto max-w-[1728px]">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="summary">Ringkasan</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <DataTable
              columns={allColumns}
              data={documents}
              name="documents"
              doc_type="central"
              searchParam="from"
              setFilteredData={setFilteredData}
            />
          </TabsContent>
          <TabsContent value="summary">
            <DataTable
              columns={sumColumns}
              data={summary.filter(
                (i: any) => i.corrective_action_count > 0
              )}
              name="documents"
              doc_type="central"
              searchParam="from"
              setFilteredData={setFilteredData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Authenticated>
  )
}
