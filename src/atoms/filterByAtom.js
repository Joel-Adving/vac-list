import { atom } from 'recoil'

export const filterByState = atom({
    key: 'filterByState',
    default: 'banned',
})
