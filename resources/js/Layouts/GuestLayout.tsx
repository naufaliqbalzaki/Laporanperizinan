import { PropsWithChildren } from 'react'

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center min-h-screen sm:justify-center">
      {children}
    </div>
  )
}
