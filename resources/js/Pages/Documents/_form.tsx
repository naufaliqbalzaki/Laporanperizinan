import InputError from '@/Components/InputError'
import { Button } from '@/Components/ui/button'
import { Calendar } from '@/Components/ui/calendar'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/Components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/Components/ui/select'
import { Textarea } from '@/Components/ui/textarea'
import { cn } from '@/lib/utils'
import { Document, Instance } from '@/types'
import { useForm } from '@inertiajs/react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useState, useEffect, ChangeEventHandler, FormEventHandler } from 'react'

export const DocumentForm = ({
  userId,
  docType,
  document,
  instances
}: {
  userId: number
  docType: string
  document?: Document
  instances: Instance[]
}) => {
  const [correctiveAction, setCorrectiveAction] = useState<string>(''); // Tambahkan state untuk nilai sementara corrective_action

  if (document) {
    if (document.issue_date) {
      document.issue_date = new Date(document.issue_date)
    }
    if (document.verification_date) {
      document.verification_date = new Date(document.verification_date)
    }
  }

  const { data, setData, post, processing, errors } = useForm(
    document || {
      user_id: userId,
      instance_id: '',
      doc_type: docType,
      number: '',
      issue_date: new Date(),
      verification_date: new Date(),
      subject: '',
      from: '',
      file: new File([], 'file'),
      phone: '',
      next_action: '',
      corrective_action: '',
      description: '',
      petugas: '',
      _method: 'post'
    }
  )

  // Update state sementara ketika nilai Select berubah
  const handleCorrectiveActionChange = (val: string) => {
    setCorrectiveAction(val)
  }

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    setData('corrective_action', correctiveAction) // Simpan nilai sementara ke form data
    setData('doc_type', docType)

    if (document && document.id) {
      data._method = 'put'
      post(route('documents.update', document.id), {
        forceFormData: true
      })
    } else {
      data._method = 'post'
      post(route('documents.store'))
    }
  }

  useEffect(() => {
    if (document) {
      setData('instance_id', document.instance_id)
      setData('number', document.number)
      setData('doc_type', document.doc_type)
      setData('issue_date', document.issue_date)
      setData('verification_date', document.verification_date)
      setData('from', document.from)
      setData('subject', document.subject)
      setData('file', document.file)
      setData('phone', document.phone)
      setData('next_action', document.next_action)
      setData('corrective_action', document.corrective_action || '')
      setData('description', document.description)
      setData('petugas', document.petugas)
      setCorrectiveAction(document.corrective_action || '') // Set nilai awal untuk corrective_action
    } else {
      setData('doc_type', docType)
    }
  }, [document, docType, setData])

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setData('file', e.target.files[0])
    }
  }
  return (
    <form onSubmit={submit}>
      <div className="mt-4">
        <Label htmlFor="number" aria-required required>
          No. Online
        </Label>
        <Input
          id="number"
          type="text"
          name="number"
          value={data.number}
          className="block w-full mt-1"
          onChange={(e) => setData('number', e.target.value)}
        />

        <InputError message={errors.number} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="from" aria-required required>
          Nama Pemohon
        </Label>
        <Input
          id="from"
          type="text"
          name="from"
          value={data.from}
          className="block w-full mt-1"
          onChange={(e) => setData('from', e.target.value)}
        />

        <InputError message={errors.from} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="subject" aria-required required>
          Perizinan
        </Label>
        <Textarea
          id="subject"
          name="subject"
          value={data.subject}
          className="block w-full mt-1"
          onChange={(e) => setData('subject', e.target.value)}
        />

        <InputError message={errors.subject} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="instance_id" aria-required required>
          Dinas
        </Label>
        <Select
          value={data.instance_id}
          onValueChange={(val) => {
            if (val === 'batalkan') {
              setData('instance_id', ''); // Reset instance_id when "Batalkan Pilihan" is selected
            } else {
              setData('instance_id', val);
            }
          }}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Pilih Dinas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {instances.map((instance) => (
                <SelectItem
                  key={instance.id}
                  value={instance.id!.toString()}
                >
                  {instance.name}
                </SelectItem>
              ))}
              <SelectItem key="batalkan" value="batalkan">
                Batalkan Pilihan
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <InputError message={errors.instance_id} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="next_action">Status Lanjut</Label>
        <Select
          value={data.next_action}
          onValueChange={(val) => {
            if (val === 'batalkan') {
              setData('next_action', ''); // Reset next_action when "Batalkan Pilihan" is selected
              setCorrectiveAction(''); // Reset corrective action as well
            } else {
              setData('next_action', val);
              if (val) setCorrectiveAction(''); // Reset corrective action when next action is chosen
            }
          }}
          disabled={correctiveAction !== ''} // Disable when corrective action is selected
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Pilih Status Lanjut" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="batalkan" value="batalkan">
                Pilih Status
              </SelectItem>
              <SelectItem key="lanjut_ke_opd" value="Lanjut Ke OPD">
                Lanjut Ke OPD
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <InputError message={errors.next_action} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="corrective_action">Status Kembali</Label>
        <Select
          value={correctiveAction}
          onValueChange={(val) => {
            if (val === 'batalkan') {
              setCorrectiveAction(''); // Reset corrective action when "Batalkan Pilihan" is selected
            } else {
              handleCorrectiveActionChange(val); // Update temporary state
            }
          }}
          disabled={data.next_action !== ''} // Disable when next_action is selected
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Pilih Status Kembali" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="batalkan" value="batalkan">
                Pilih Status
              </SelectItem>
              <SelectItem key="analisa_pengembalian_berkas" value="Analisa Pengembalian Berkas">
                Analisa Pengembalian Berkas
              </SelectItem>
              <SelectItem key="pengembalian_ptsp" value="Pengembalian PTSP">
                Pengembalian PTSP
              </SelectItem>
              <SelectItem key="pengembalian_opd" value="Pengembalian OPD">
                Pengembalian OPD
              </SelectItem>
              <SelectItem key="berkas_di_nonaktifkan" value="Berkas Di Nonaktifkan">
                Berkas Di Nonaktifkan
              </SelectItem>
              <SelectItem key="sk_terbit" value="SK Terbit">
                SK Terbit
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <InputError message={errors.corrective_action} className="mt-2" />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Label htmlFor="issue_date" aria-required required>
          Tanggal Terbit
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !data.issue_date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {data.issue_date ? (
                `${data.issue_date.toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}`
              ) : (
                <span>Pilih Tanggal Terbit</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={data.issue_date}
              onSelect={(issue_date) => {
                if (issue_date) {
                  setData('issue_date', issue_date)
                }
              }}
              initialFocus
            />{' '}
            <Input
              type="time"
              className="mt-2 bg-neutral-50 border leading-none border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              value={data.issue_date.toLocaleTimeString([], {
                hourCycle: 'h23',
                hour: '2-digit',
                minute: '2-digit'
              })}
              onChange={(selectedTime) => {
                const currentTime = data.issue_date
                currentTime.setHours(
                  parseInt(selectedTime.target.value.split(':')[0]),
                  parseInt(selectedTime.target.value.split(':')[1]),
                  0
                )
                setData('issue_date', currentTime)
              }}
            />
          </PopoverContent>
        </Popover>

        <InputError message={errors.issue_date} className="mt-2" />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Label htmlFor="verification_date" aria-required required>
          Tanggal Verifikasi
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !data.verification_date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {data.verification_date ? (
                `${data.verification_date.toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}`
              ) : (
                <span>Pilih Tanggal Verifikasi</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={data.verification_date}
              onSelect={(verification_date) => {
                if (verification_date) {
                  setData('verification_date', verification_date)
                }
              }}
              initialFocus
            />{' '}
            <Input
              type="time"
              className="mt-2 bg-neutral-50 border leading-none border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              value={data.verification_date.toLocaleTimeString([], {
                hourCycle: 'h23',
                hour: '2-digit',
                minute: '2-digit'
              })}
              onChange={(selectedTime) => {
                const currentTime = data.verification_date
                currentTime.setHours(
                  parseInt(selectedTime.target.value.split(':')[0]),
                  parseInt(selectedTime.target.value.split(':')[1]),
                  0
                )
                setData('verification_date', currentTime)
              }}
            />
          </PopoverContent>
        </Popover>

        <InputError
          message={errors.verification_date}
          className="mt-2"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="description">Keterangan</Label>
        <Textarea
          id="description"
          name="description"
          value={data.description}
          className="block w-full mt-1"
          onChange={(e) => setData('description', e.target.value)}
        />
        <InputError message={errors.description} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="phone" aria-required required>
          No. Telepon
        </Label>
        <Input
          id="phone"
          type="text"
          name="phone"
          value={data.phone}
          className="block w-full mt-1"
          onChange={(e) => setData('phone', e.target.value)}
        />

        <InputError message={errors.phone} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="petugas" aria-required required>
          Nama Verifikator
        </Label>
        <Input
          id="petugas"
          type="text"
          name="petugas"
          value={data.petugas}
          className="block w-full mt-1"
          onChange={(e) => setData('petugas', e.target.value)}
        />

        <InputError message={errors.petugas} className="mt-2" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={processing}
        >
          {document ? 'Ubah' : 'Buat'}
        </Button>
      </div>
    </form>
  )
}
