'use client'
import { needsReloadAtom } from '@/store'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ReloadHandler() {
  const [needsReload] = useAtom(needsReloadAtom)
  const path = usePathname()

  useEffect(() => {
    if (needsReload?.length > 0 && needsReload?.some((p) => p === path)) {
      location.reload()
    }
  }, [path, needsReload])

  return null
}
