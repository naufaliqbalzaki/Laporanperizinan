import { Button } from '@/Components/ui/button'
import { cn } from '@/lib/utils'
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon
} from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

const CaretIcon = ({ column }: { column: Column<any, any> }) => {
  if (column.getIsSorted() === 'desc') {
    return <CaretDownIcon className="w-4 h-4 ml-2" />
  } else if (column.getIsSorted() === 'asc') {
    return <CaretUpIcon className="w-4 h-4 ml-2" />
  } else {
    return <CaretSortIcon className="w-4 h-4 ml-2" />
  }
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <Button
      variant="ghost"
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === 'asc')
      }
    >
      {title}
      <CaretIcon column={column} />
    </Button>
  )
}
