import { DataTable } from '@/Components/table/DataTable'
import { DataTableColumnHeader } from '@/Components/table/DataTableColumnHeader'
import { DataTableRowActions } from '@/Components/table/DataTableRowActions'
import { Button } from '@/Components/ui/button'
import { Checkbox } from '@/Components/ui/checkbox'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Instance, PageProps } from '@/types'
import { Head, router } from '@inertiajs/react'
import { PlusIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react'
import { toast } from 'sonner'

function generateColumn({
  appUrl
}: {
  appUrl: string
}): ColumnDef<Instance, any>[] {
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
    // {
    //   accessorKey: 'image',
    //   header: 'Gambar',
    //   cell: ({ row }) => {
    //     const isPlaceholder = row.original.image
    //       ?.toString()
    //       .startsWith('https://via.placeholder')
    //     const url = !isPlaceholder
    //       ? appUrl + '/storage/instances/' + row.original.image
    //       : 'https://placehold.jp/150x150.png'
    //     return (
    //       <div className="object-cover bg-contain">
    //         <img
    //           src={url}
    //           alt={row.original.name}
    //           className="object-cover object-center transition-all duration-300 h-28 rounded-xl w-28"
    //         />
    //       </div>
    //     )
    //   }
    // },
    {
      accessorKey: 'name',
      meta: 'Nama Dinas',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama Dinas" />
      )
    },
    // {
    //   accessorKey: 'email',
    //   header({ column }) {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() =>
    //           column.toggleSorting(column.getIsSorted() === 'asc')
    //         }
    //       >
    //         Email
    //         <CaretSortIcon className="w-4 h-4 ml-2" />
    //       </Button>
    //     )
    //   }
    // },
    // {
    //   accessorKey: 'is_active',
    //   header(props) {
    //     return <div className="text-center">Aktif</div>
    //   },
    //   cell: ({ row }) => (
    //     <div className="flex items-center justify-center">
    //       {row.original.is_active ? (
    //         <CheckCircledIcon className="w-5 h-5 text-green-500" />
    //       ) : (
    //         <CrossCircledIcon className="w-5 h-5 text-red-500" />
    //       )}
    //     </div>
    //   )
    // },
    // {
    //   accessorKey: 'created_at',
    //   header: 'Dibuat pada',
    //   cell: ({ row }) => (
    //     <time dateTime={row.original.created_at}>
    //       {new Date(row.original.created_at).toLocaleDateString(
    //         'id-ID',
    //         {
    //           day: 'numeric',
    //           month: 'long',
    //           year: 'numeric'
    //         }
    //       )}
    //     </time>
    //   )
    // },
    {
      id: 'actions',
      header() {
        return <div className="text-center">Aksi</div>
      },
      cell: ({ row }) => (
        <DataTableRowActions row={row} name="instances" />
      )
    }
  ]
}

export default function IndexInstancePage({
  auth,
  instances,
  flash,
  appUrl
}: PageProps & {
  instances: Instance[]
}) {
  const columns = generateColumn({ appUrl })

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success)
    }

    if (flash?.error) {
      toast.error(flash.error)
    }
  }, [flash])

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Dinas ( {instances.length} )
          </h2>
          <Button
            className="flex items-center gap-2"
            onClick={() => router.visit('/instances/create')}
          >
            <PlusIcon className="w-5 h-5" />
            Buat Baru
          </Button>
        </div>
      }
    >
      <Head title="Dinas" />

      <div className="px-8 pb-8 mx-auto max-w-[1728px]">
        <DataTable
          columns={columns}
          data={instances}
          name="instances"
          searchParam="name"
        />
      </div>
    </AuthenticatedLayout>
  )
}
