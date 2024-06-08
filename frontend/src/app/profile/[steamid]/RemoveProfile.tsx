'use client'
import Modal from '@/components/Modal'
import { useUser } from '@/hooks/useUser'
import { baseUrl, api } from '@/services/api'
import { needsReloadAtom } from '@/store'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RemoveProfile({ steamId }: { steamId: string }) {
  const [_, setNeedsReload] = useAtom(needsReloadAtom)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const user = useUser()

  const handleDelete = async () => {
    const res = await fetch(`${baseUrl}/api/suspects/${steamId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      setShowModal(!showModal)
      await api.revalidate('/')
      await fetch(`${baseUrl}/`)
      setNeedsReload((prev) => [...prev, '/'])
      router.push('/')
    }
  }

  return (
    <>
      {showModal && (
        <Modal
          text={'Are you sure you want to remove the suspect?'}
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
        />
      )}

      {user?.uid === 'ZwA7YpCdqmNa7N5bozjhAjUiJMC2' && (
        <button
          className="p-2 mt-3 text-zinc-100 border-[1px] border-zinc-100"
          onClick={() => setShowModal(!showModal)}
        >
          Remove Suspect
        </button>
      )}
    </>
  )
}
