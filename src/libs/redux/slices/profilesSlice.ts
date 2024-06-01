import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'

export interface profilesState {
  value: ProfileType[]
}

const initialState: profilesState = {
  value: []
}

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfiles: (state, action: PayloadAction<ProfileType[]>) => {
      state.value = action.payload
    }
  }
})

export const { setProfiles } = profilesSlice.actions
export default profilesSlice.reducer

export const useProfilesState = () => {
  const value = useSelector((state: RootState) => state.profiles.value)
  const dispatch = useDispatch()
  return [value, (value: ProfileType[]) => dispatch(setProfiles(value))] as const
}

export type ProfileType = {
  added_by: {
    photoURL: string
    email: string
    name: string
    uid: string
  }
  suspect_type: string
  created: {
    seconds: number
    nanoseconds: number
  }
  playerstats?: {
    steamID: string
    gameName: string
    stats: {
      name: string
      value: number
    }[]
    achievements: {
      name: string
      achieved: number
    }[]
  }
  loccountrycode?: string
  id: string
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  personastate: number
  realname: string
  primaryclanid: string
  timecreated: number
  personastateflags: number
  SteamId: string
  CommunityBanned: boolean
  VACBanned: boolean
  NumberOfVACBans: number
  DaysSinceLastBan: number
  NumberOfGameBans: number
  EconomyBan: string
}
