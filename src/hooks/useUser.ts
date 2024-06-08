import { userAtom } from '@/store'
import { useAtom } from 'jotai'

export function useUser() {
  return useAtom(userAtom)[0]
}
