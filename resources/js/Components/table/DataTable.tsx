import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/Components/ui/table'
import { cn } from '@/lib/utils'
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  RowModel,
  SortingFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable
} from '@tanstack/react-table'
import { Dispatch, useEffect, useState } from 'react'
import { DataTablePagination } from './DataTablePagination'
import { DataTableToolbar } from './DataTableToolbar'

import {
  RankingInfo,
  compareItems,
  rankItem
} from '@tanstack/match-sorter-utils'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
    dateRangeFilter: FilterFn<unknown>
    reportVerificationDateRangeFilter: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  name?: 'documents' | 'instances' | 'reports'
  doc_type?: 'central' | 'east'
  searchParam?: string
  showToolbar?: boolean
  pageSizeOptions?: number[]
}

export const dateRangeFilter: FilterFn<any> = (
  row,
  columnId,
  value
) => {
  const date = new Date(row.getValue(columnId))
  const from = new Date(value.from)
  const to = new Date(value.to)
  if ((from || to) && !date) return false
  if (from && !to) {
    return date.getTime() >= from.getTime()
  } else if (!from && to) {
    return date.getTime() <= to.getTime()
  } else if (from && to) {
    return (
      date.getTime() >= from.getTime() &&
      date.getTime() <= to.getTime()
    )
  } else {
    return true
  }
}

dateRangeFilter.autoRemove

export const reportVerificationDateRangeFilter: FilterFn<any> = (
  row,
  columnId,
  value
) => {
  const data = row.getValue(columnId)
  if (typeof data !== 'object') {
    return false
  } else {
    if (data === null) {
      return false
    } else {
      const array = Object.values(data)
      const from = new Date(value.from)
      const to = new Date(value.to)
      if ((from || to) && !array) return false
      if (from && !to) {
        return array.some((date: { verification_date: string }) => {
          const dateValue = new Date(date.verification_date)
          return dateValue.getTime() >= from.getTime()
        })
      } else if (!from && to) {
        return array.some((date: { verification_date: string }) => {
          const dateValue = new Date(date.verification_date)
          return dateValue.getTime() <= to.getTime()
        })
      } else if (from && to) {
        return array.some((date: { verification_date: string }) => {
          const dateValue = new Date(date.verification_date)
          return (
            dateValue.getTime() >= from.getTime() &&
            dateValue.getTime() <= to.getTime()
          )
        })
      } else {
        return true
      }
    }
  }
}

reportVerificationDateRangeFilter.autoRemove

export const fuzzyFilter: FilterFn<any> = (
  row,
  columnId,
  value,
  addMeta
) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank
  })

  return itemRank.passed
}
export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  return dir === 0
    ? sortingFns.alphanumeric(rowA, rowB, columnId)
    : dir
}

export function DataTable<TData, TValue>({
  columns,
  data,
  name,
  doc_type,
  searchParam,
  showToolbar = true,
  pageSizeOptions = [10, 20, 30, 40, 50, 100, 200, 500],
  setFilteredData
}: DataTableProps<TData, TValue> & {
  setFilteredData?: Dispatch<RowModel<TData>>
}) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter
    },
    filterFns: {
      dateRangeFilter: dateRangeFilter,
      reportVerificationDateRangeFilter:
        reportVerificationDateRangeFilter,
      fuzzy: fuzzyFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  useEffect(() => {
    if (pageSizeOptions) {
      table.setPageSize(pageSizeOptions[0])
    }
  }, [table])

  const [total, setTotal] = useState(0)
  const [approved, setApproved] = useState(0)
  const [corrective, setCorrective] = useState(0)

  useEffect(() => {
    if (name === 'reports') {
      const data = table.getFilteredRowModel().rows
      let tempTotal = 0
      let tempApproved = 0
      let tempCorrective = 0
      data.map((item: any) => {
        const original = item.original
        tempTotal += original.total
        tempApproved += original.approved_total
        tempCorrective += original.corrective_total
      })
      setTotal(tempTotal)
      setApproved(tempApproved)
      setCorrective(tempCorrective)
    }
  }, [table.getFilteredRowModel()])

  return (
    <div className="space-y-4">
      {showToolbar && (
        <DataTableToolbar
          table={table}
          name={name}
          doc_type={doc_type}
          searchParam={searchParam}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
          setFilteredData={setFilteredData}
        />
      )}
      <div className="border rounded-md">
      <Table>
          <TableHeader className="bg-emerald-500 bg-opacity-5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="pl-4 text-left" // Tambahkan padding dan rata tengah
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'pl-8 text-left', // Tambahkan padding dan rata tengah
                          parseInt(cell.row.id) % 2 === 0
                            ? 'bg-background'
                            : 'dark:bg-neutral-900 bg-neutral-100'
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {name == 'reports' && (
                  <TableRow>
                    <TableCell className="pl-8 text-left bg-opacity-50 bg-sky-500">
                      Total Keseluruhan
                    </TableCell>
                    <TableCell className="p-4 bg-opacity-50 bg-sky-500"></TableCell>
                    <TableCell className="pl-8 text-center bg-opacity-50 bg-sky-500">
                      {approved}
                    </TableCell>
                    <TableCell className="pl-8 text-center bg-opacity-50 bg-sky-500">
                      {corrective}
                    </TableCell>
                    <TableCell className="pl-8 text-center bg-opacity-50 bg-sky-500">
                      {total}
                    </TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="p-4 h-24 text-center"
                >
                  Data Tidak Ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        pageSizeOptions={pageSizeOptions}
        name={name}
      />
    </div>
  )
}
