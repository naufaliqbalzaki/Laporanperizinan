import { Button } from '@/Components/ui/button'
import { Calendar } from '@/Components/ui/calendar'
import { Input } from '@/Components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/Components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon, Cross2Icon } from '@radix-ui/react-icons'
import { RowModel, Table } from '@tanstack/react-table'
import { Dispatch, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DataTableViewOptions } from './DataTableViewOptions'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  name?: 'documents' | 'instances' | 'reports'
  doc_type?: 'central' | 'east'
  searchParam?: string
  setGlobalFilter?: (filterValue: string) => void
  globalFilter?: string
}

const ClearButton = ({
  table,
  onClick
}: DataTableToolbarProps<any> & {
  onClick?: () => void
}) => {
  const isFiltered = table.getState().columnFilters.length > 0

  useEffect(() => {
    if (!isFiltered && onClick) {
      onClick()
    }
  }, [isFiltered])

  if (isFiltered) {
    return (
      <Button
        variant="secondary"
        onClick={() => {
          table.resetColumnFilters()
        }}
        className="h-8 px-2 lg:px-3"
      >
        Atur Ulang
        <Cross2Icon className="w-4 h-4 ml-2" />
      </Button>
    )
  }
  return null
}

export function DataTableToolbar<TData>({
  table,
  name,
  doc_type,
  searchParam,
  setGlobalFilter,
  globalFilter,
  setFilteredData
}: DataTableToolbarProps<TData> & {
  setFilteredData?: Dispatch<RowModel<TData>>
}) {
  const [issueDate, setIssueDate] = useState<DateRange | undefined>()
  const [verificationDate, setVerificationDate] = useState<
    DateRange | undefined
  >()

  useEffect(() => {
    setFilteredData?.(table.getFilteredRowModel())
  }, [table.getState().columnFilters])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start flex-1 space-x-0 space-y-4 md:space-y-0 md:space-x-8 md:items-center md:flex-row">
        <Input
          placeholder={`Cari ${searchParam === 'from' ? 'No / Pemohon / Dinas' : 'Nama'}`}
          value={
            (table.getColumn(searchParam || '')?.getFilterValue() as
              | string
              | undefined) ??
            globalFilter ??
            ''
          }
          onChange={(event) => {
            if (name === 'documents') {
              setGlobalFilter?.(event.target.value)
            } else {
              table
                .getColumn(searchParam || '')
                ?.setFilterValue(event.target.value)
            }
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {name === 'documents' && (
          <>
            <DataTableDateRange
              table={table}
              name={name}
              type="issue_date"
              date={issueDate}
              setDate={setIssueDate}
            />
            <DataTableDateRange
              table={table}
              name={name}
              type="verification_date"
              date={verificationDate}
              setDate={setVerificationDate}
            />
          </>
        )}{' '}
        {name === 'reports' && (
          <DataTableDateRange
            table={table}
            name={name}
            type="verification_date"
            date={verificationDate}
            setDate={setVerificationDate}
          />
        )}
        <ClearButton
          table={table}
          onClick={() => {
            setIssueDate(undefined)
            setVerificationDate(undefined)
          }}
        />
      </div>
      <DataTableViewOptions
        table={table}
        name={name}
        doc_type={doc_type}
      />
    </div>
  )
}

const DataTableDateRange = ({
  table,
  type,
  date,
  setDate
}: DataTableToolbarProps<any> & {
  type: 'issue_date' | 'verification_date'
  date?: DateRange
  setDate: (date: DateRange) => void
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date?.from ? (
            date.to ? (
              <>
                {date.from.toLocaleString(['id'], {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}{' '}
                -{' '}
                {date.to.toLocaleString(['id'], {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </>
            ) : (
              date.from.toLocaleString(['id'], {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })
            )
          ) : (
            <span>
              Filter Berdasarkan Tanggal{' '}
              <span className="font-bold">
                {type === 'issue_date'
                  ? 'Terbit'
                  : type === 'verification_date'
                    ? 'Verifikasi'
                    : ''}
              </span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(val) => {
            if (val) {
              setDate(val)
              table.getColumn(type)?.setFilterValue(val)
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
