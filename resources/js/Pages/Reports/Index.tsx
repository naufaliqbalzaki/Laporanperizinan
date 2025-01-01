import { DataTable } from '@/Components/table/DataTable'
import { DataTableColumnHeader } from '@/Components/table/DataTableColumnHeader'
import { Button } from '@/Components/ui/button'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import { DownloadIcon } from '@radix-ui/react-icons'
import { ColumnDef, RowModel } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ReportIndexPage({
  auth,
  subjects,
  flash
}: PageProps & { subjects: any }) {
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: 'subject',
      meta: 'Perizinan',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Perizinan" />
      )
    },
    {
      accessorKey: 'verification_date',
      meta: 'Tanggal Verifikasi',
      header: '',
      filterFn: 'reportVerificationDateRangeFilter',
      cell(props) {
        return null
      }
    },
    {
      accessorKey: 'approved_total',
      meta: 'Berkas Lanjut',
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 ml-4">
          <DataTableColumnHeader column={column} title="Berkas Lanjut" />
        </div>
      ),
      cell(props) {
        return (
          <div className="flex items-center justify-center gap-2">
            {props.getValue()}
          </div>
        )
      }
    },
    {
      accessorKey: 'corrective_total',
      meta: 'Berkas Kembali',
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 ml-4">
          <DataTableColumnHeader
            column={column}
            title="Berkas Kembali"
          />
        </div>
      ),
      cell(props) {
        return (
          <div className="flex items-center justify-center gap-2">
            {props.getValue()}
          </div>
        )
      }
    },
    {
      accessorKey: 'total',
      meta: 'Total',
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 ml-4">
          <DataTableColumnHeader column={column} title="Total" />
        </div>
      ),
      cell(props) {
        return (
          <div className="flex items-center justify-center gap-2">
            {props.getValue()}
          </div>
        )
      }
    }
  ]

  const [filteredData, setFilteredData] = useState<
    RowModel<any> | undefined
  >(undefined)

  const [filteredIds, setFilteredIds] = useState<number[]>([])

  useEffect(() => {
    toast.dismiss()
    if (flash?.success) {
      toast.success(flash.success)
    }

    if (flash?.error) {
      toast.error(flash.error)
    }
    let tempIds: number[] = []
    if (filteredData) {
      filteredData.rows.map((row) => {
        row.original.id.map((id: any) => {
          tempIds.push(id.id)
        })
      })
      setFilteredIds(tempIds)
    }
  }, [flash, filteredData])

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Laporan Perizinan
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={route('reports.download', {
                ids: filteredIds
              })}
            >
              <Button type="button">
                <DownloadIcon className="w-5 h-5" />
                Unduh
              </Button>
            </a>
          </div>
        </div>
      }
    >
      <Head title="Laporan" />

      <div className="px-8 pb-8 mx-auto max-w-[1728px]">
        <DataTable
          columns={columns}
          data={subjects}
          name="reports"
          searchParam="subject"
          pageSizeOptions={[50, 100, 200, 500]}
          setFilteredData={setFilteredData}
        />
      </div>
    </Authenticated>
  )
}
