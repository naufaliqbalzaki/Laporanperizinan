import {
  EyeOpenIcon,
  Pencil1Icon,
  TrashIcon
} from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button, buttonVariants } from '@/Components/ui/button'
import { cn } from '@/lib/utils'
import { Link, router } from '@inertiajs/react'
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
} from '../ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Table, TableBody, TableRow } from '../ui/table'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  name: 'documents' | 'instances'
}

const EditDataLink = ({
  name,
  id,
  showText
}: {
  name: string
  id: string
  showText: boolean
}) => (
  <Link href={`/${name}/${id}/edit`}>
    <Button
      className={cn(
        'bg-blue-500 w-64',
        !showText && 'bg-opacity-5 w-min'
      )}
      variant="ghost"
      type="button"
    >
      <Pencil1Icon
        className={cn('w-4 h-4', !showText && 'text-blue-500')}
      />
      {showText && <span className="ml-2">Ubah</span>}
    </Button>
  </Link>
)

const DeleteDataDialog = ({
  id,
  name,
  showText
}: {
  id: string
  name: string
  showText?: boolean
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        className={cn(
          'bg-red-500 w-64',
          !showText && 'bg-opacity-5 w-min'
        )}
        variant="ghost"
      >
        <TrashIcon
          className={cn('w-4 h-4', !showText && 'text-red-500')}
        />
        {showText && <span className="ml-2">Hapus</span>}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Apakah Anda Yakin Ingin Menghapus Data Ini?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Data Yang Dihapus Tidak Dapat Dikembalikan.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() =>
            router.visit(`/${name}/${id}`, {
              method: 'delete'
            })
          }
          className={buttonVariants({ variant: 'destructive' })}
        >
          Hapus
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

const DocumentDetail = ({
  name,
  data
}: {
  name: string
  data: any
}) => (
  <>
    <TableRow className="flex items-center gap-2 p-2 hover:bg-inherit">
      <p className="font-medium min-w-32">No. Online</p>
      <p>
        <span className="mr-2">:</span>
        {data.number}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-neutral-900">
      <p className="font-medium min-w-32">Nama Pemohon</p>
      <p>
        <span className="mr-2">:</span>
        {data.from}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-neutral-900">
      <p className="font-medium min-w-32">Perizinan</p>
      <p>
        <span className="mr-2">:</span>
        {data.subject}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 hover:bg-inherit">
      <p className="font-medium min-w-32">Nama Dinas</p>
      <p>
        <span className="mr-2">:</span>
        {data.instance_name}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-neutral-900">
      <p className="font-medium min-w-32">Status Lanjut</p>
      <p>
        <span className="mr-2">:</span>
        {data.next_action}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-inherit">
      <p className="font-medium min-w-32">Status Kembali</p>
      <p>
        <span className="mr-2">:</span>
        {data.corrective_action}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-neutral-900">
      <p className="font-medium min-w-32">Tanggal Terbit</p>
      <p>
        <span className="mr-2">:</span>
        {data.issue_date}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-inherit">
      <p className="font-medium min-w-32">Tanggal Verifikasi</p>
      <p>
        <span className="mr-2">:</span>
        {data.verification_date}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-neutral-900">
      <p className="font-medium min-w-32">Keterangan</p>
      <p>
        <span className="mr-2">:</span>
        {data.description}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-inherit">
      <p className="font-medium min-w-32">No. Telepon</p>
      <p>
        <span className="mr-2">:</span>
        {data.phone}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 dark:bg-neutral-900">
      <p className="font-medium min-w-32">Nama Verifikator</p>
      <p>
        <span className="mr-2">:</span>
        {data.petugas}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 mt-6 border-none justify-evenly dark:bg-inherit">
      <DeleteDataDialog id={data.id} name={name} showText={true} />
      <EditDataLink id={data.id} name={name} showText={true} />
    </TableRow>
  </>
)

const InstanceDetail = ({
  data,
  name
}: {
  data: any
  name: string
}) => (
  <>
    <TableRow className="flex items-center gap-2 p-2 hover:bg-inherit">
      <p className="font-medium min-w-32">Nama</p>
      <p>
        <span className="mr-2">:</span>
        {data.name}
      </p>
    </TableRow>
    <TableRow className="flex items-center gap-2 p-2 mt-6 border-none justify-evenly dark:bg-inherit">
      <DeleteDataDialog id={data.id} name={name} showText={true} />
      <EditDataLink id={data.id} name={name} showText={true} />
    </TableRow>
  </>
)

export function DataTableRowActions({
  row,
  name
}: DataTableRowActionsProps<any>) {
  const data = row.original
  return (
    <div className="flex items-center justify-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-green-500 bg-opacity-5 w-min"
            variant="ghost"
            type="button"
          >
            <EyeOpenIcon className="w-4 h-4 text-green-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Detail {name === 'instances' ? 'Dinas' : 'Berkas'} "
              {data.name || data.from}"
            </DialogTitle>
          </DialogHeader>
          <Separator />
          <Table className="space-y-2 ">
            {name === 'documents' ? (
              <TableBody>
                <DocumentDetail data={data} name={name} />
              </TableBody>
            ) : (
              <InstanceDetail data={data} name={name} />
            )}
          </Table>
        </DialogContent>
      </Dialog>
      <EditDataLink id={data.id} name={name} showText={false} />
      <DeleteDataDialog id={data.id} name={name} />
    </div>
  )
}
