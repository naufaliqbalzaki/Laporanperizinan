import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/Components/ui/card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import {
  FileIcon,
  FileTextIcon,
  SketchLogoIcon
} from '@radix-ui/react-icons'
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
)

const meta: Record<string, any> = {
  doc_central: {
    icon: <FileTextIcon className="w-4 h-4 text-muted-foreground" />
  },
  doc_east: {
    icon: <FileIcon className="w-4 h-4 text-muted-foreground" />
  },
  instance_active: {
    icon: <SketchLogoIcon className="w-4 h-4 text-muted-foreground" />
  },
  instance_inactive: {
    icon: <SketchLogoIcon className="w-4 h-4 text-muted-foreground" />
  }
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

function generateChart({
  data,
  unit
}: {
  data: any
  unit: 'surat' | 'dinas'
}) {
  const color = randomColor()
  let dates: any = []
  let groupedData: any = {}
  data.data.forEach((item: any) => {
    const dateOnly = new Date(item.created_at).toLocaleString(
      'id-ID',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    )

    if (!dates.includes(dateOnly)) {
      dates.push(dateOnly)
    }

    if (!groupedData[dateOnly]) {
      groupedData[dateOnly] = []
    }
    groupedData[dateOnly].push(item)
  })

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: unit.charAt(0).toUpperCase() + unit.slice(1),
        data: Object.keys(groupedData).map((key) => ({
          x: key,
          y: groupedData[key].length
        })),
        backgroundColor: color,
        borderColor: color
      }
    ]
  }

  const options: ChartOptions<any> = {
    responsive: true,

    scales: {
      x: {
        time: {
          unit: 'day'
        },
        grid: {
          color: 'grey',
          borderColor: 'grey',
          tickColor: 'grey'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total'
        },
        ticks: {
          precision: 0
        },
        grid: {
          color: 'grey',
          borderColor: 'grey',
          tickColor: 'grey'
        }
      }
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    }
  }

  return <Line data={chartData} options={options} height={200} />
}

export default function Dashboard({
  auth,
  data
}: PageProps & {
  data: any
}) {
  const keys = Object.keys(data)
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="px-8 mx-auto max-w-[1728px]">
        <div className="grid grid-cols-1 gap-2 transition-all duration-300 ease-in-out md:grid-cols-3">
          {keys.map((key) => (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  {data[key].name}
                </CardTitle>
                {meta[key]?.icon && <>{meta[key].icon}</>}
              </CardHeader>
              <CardContent className="text-2xl font-semibold">
                {generateChart({
                  data: data[key],
                  unit: data[key].unit
                })}
                <h3 className="mt-4 font-semibold">
                  {data[key].data.length}
                  <span className="ml-2 font-normal text-gray-500">
                    {data[key].unit}
                  </span>
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
