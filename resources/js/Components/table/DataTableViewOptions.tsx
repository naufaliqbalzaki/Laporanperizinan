import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Column, Table } from '@tanstack/react-table'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/Components/ui/alert-dialog'
import { Button, buttonVariants } from '@/Components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/Components/ui/dropdown-menu'
import { router } from '@inertiajs/react'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  name?: 'documents' | 'instances' | 'reports'
  doc_type?: 'central' | 'east'
}

function determineText(column: Column<any, any>) {
  if (typeof column.columnDef.meta === 'string') {
    return column.columnDef.meta
  }

  return column.id
}

export function DataTableViewOptions<TData>({
  table,
  name,
  doc_type
}: DataTableViewOptionsProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDeleteSelectedRows = () => {
    const ids = selectedRows.map((row: any) => {
      return parseInt(row.original.id)
    })
    router.post(route(`${name}.destroy_batch`), {
      doc_type: doc_type,
      ids: ids
    })
  }

  return (
    <>
      {selectedRows.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="hidden h-8 mr-2 lg:flex"
            >
              Hapus {selectedRows.length} Baris Terpilih
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Hapus {selectedRows.length} Baris Terpilih
              </AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda Yakin Ingin Menghapus{' '}
                {selectedRows.length} Baris Terpilih?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({
                  variant: 'destructive'
                })}
                onClick={handleDeleteSelectedRows}
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hidden h-8 ml-auto lg:flex"
          >
            <MixerHorizontalIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
          <DropdownMenuLabel>
            Kolom Yang Ditampilkan
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' &&
                column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {determineText(column)}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
