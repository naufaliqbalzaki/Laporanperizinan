import InputError from '@/Components/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Instance } from '@/types'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'

export const InstanceForm = ({
  appUrl,
  instance
}: {
  appUrl: string
  instance?: Instance
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    null
  )

  const { data, setData, post, processing, errors } = useForm(
    instance || {
      name: '',
      // is_active: true,
      // kepsek: '',
      // website: '',
      // email: '',
      // image: null,
      // address: '',
      // district: '',
      // city: '',
      // province: '',
      // postal_code: '',
      _method: 'post'
    }
  )

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    if (instance && instance.id) {
      data._method = 'put'
      post(route('instances.update', instance.id), {
        forceFormData: true
      })
    }
    if (!instance) {
      post(route('instances.store'))
    }
  }

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setData('image', e.target.files[0])
  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       setImage(reader.result)
  //     }
  //     reader.readAsDataURL(e.target.files[0])
  //   }
  // }

  // useEffect(() => {
  //   if (instance && instance.image) {
  //     const url = appUrl + '/storage/instances/' + instance.image
  //     setImage(url)
  //   }
  // }, [instance])

  return (
    <form onSubmit={submit}>
      <div>
        <Label htmlFor="name" aria-required required>
          Nama Dinas
        </Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={data.name}
          className="block w-full mt-1"
          autoComplete="additional-name"
          onChange={(e) => setData('name', e.target.value)}
        />

        <InputError message={errors.name} className="mt-2" />
      </div>
      {/* <div className="flex items-center gap-2 mt-4">
        <Label htmlFor="is_active">Aktif ?</Label>
        <Checkbox
          id="is_active"
          name="is_active"
          checked={data.is_active}
          className="block mt-1"
          onCheckedChange={(checked) =>
            setData('is_active', checked as boolean)
          }
        />
        <InputError message={errors.is_active} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="text"
          name="website"
          value={data.website}
          className="block w-full mt-1"
          autoComplete="additional-name"
          onChange={(e) => setData('website', e.target.value)}
        />
        <InputError message={errors.website} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="text"
          name="email"
          value={data.email}
          className="block w-full mt-1"
          autoComplete="additional-name"
          onChange={(e) => setData('email', e.target.value)}
        />
        <InputError message={errors.email} className="mt-2" />
      </div>
      <div className="mt-4">
        <Label htmlFor="image">Logo</Label>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {image && (
            <img
              src={image as string}
              alt="image"
              className="object-cover object-center w-48 h-48 transition-all duration-300 rounded-xl"
            />
          )}
          <Input
            id="image"
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            className="block mt-1 "
            onChange={handleImageChange}
          />
        </div>
        <InputError message={errors.image} className="mt-2" />
      </div>
      <Separator className="mt-8" />
      <div className="mt-4">
        <Label htmlFor="address">Alamat</Label>
        <Input
          id="address"
          type="text"
          name="address"
          value={data.address}
          className="block w-full mt-1"
          autoComplete="additional-name"
          onChange={(e) => setData('address', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="district">Kecamatan</Label>
        <Input
          id="district"
          type="text"
          name="district"
          value={data.district}
          className="block w-full mt-1"
          autoComplete="additional-name"
          onChange={(e) => setData('district', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="city">Kota</Label>
        <Input
          id="city"
          type="text"
          name="city"
          value={data.city}
          className="block w-full mt-1"
          autoComplete="additional-name"
          onChange={(e) => setData('city', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="province">Provinsi</Label>
        <Input
          id="province"
          type="text"
          name="province"
          value={data.province}
          className="block w-full mt-1"
          autoComplete="additional-name"
          onChange={(e) => setData('province', e.target.value)}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="postal_code">Kode Pos</Label>
        <Input
          id="postal_code"
          type="number"
          name="postal_code"
          value={data.postal_code}
          className="block w-full mt-1"
          autoComplete="additional-name"
          onChange={(e) => setData('postal_code', e.target.value)}
        />
      </div> */}
      <div className="flex items-center justify-between mt-4">
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={processing}
        >
          {instance ? 'Ubah' : 'Buat'}
        </Button>
      </div>
    </form>
  )
}
