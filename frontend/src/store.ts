import { atom } from 'jotai'
import { UserType } from './types'

export const userAtom = atom<UserType | null>(null)

export const needsReloadAtom = atom<string[]>([])
