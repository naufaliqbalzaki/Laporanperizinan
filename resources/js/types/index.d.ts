import { Config } from 'ziggy-js'

export interface User {
  id: number
  name: string
  username: string
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  appName: string
  appUrl: string
  auth: {
    user: User
  }
  ziggy: Config & { location: string }
  flash?: {
    success?: string
    error?: string
  }
}

export interface Document {
  id: number
  user_id: number
  instance_id: string
  doc_type: string
  number: string
  issue_date: Date
  verification_date: Date
  from: string
  subject: string
  file: string | File
  phone: string
  next_action?: string
  corrective_action?: string
  description?: string
  petugas?: string
  created_at: string
  updated_at: string
  _method?: 'post' | 'put'
}

export type Instance = {
  id: string | null
  parent_id: number | null
  name: string
  // is_active: boolean
  // kepsek: string
  // website: string
  // email: string
  // image?: File | string | null
  // address: string
  // district: string
  // city: string
  // province: string
  // postal_code: string
  created_at: string
  updated_at: string
  _method?: 'post' | 'put'
}
