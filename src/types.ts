export type UserType = {
  uid: string
  email: string | null
  name?: string | null
  photoURL?: string | null
}

type Created = {
  seconds: number
  nanoseconds: number
}

type AddedBy = {
  photoURL: string
  email: string
  name: string
  uid: string
}

export type FirestoreProfileType = {
  added_by: AddedBy
  suspect_type: string
  created: Created
  id: string
}

export type SuspectType = {
  id: string
  steam_id: string
  suspect_type: string
  added_by: AddedBy
  created: Created
}

type PlayerStats = {
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

export type FullProfileType = {
  id: number
  steam_id: string
  suspect_type: string
  persona_name: string
  profile_state: number
  profile_url: string
  avatar: string
  avatar_medium: string
  avatar_full: string
  avatar_hash: string
  persona_state: number
  primary_clan_id: string
  persona_state_flags: number
  community_banned: boolean
  vac_banned: boolean
  number_of_vac_bans: number
  days_since_last_ban: number
  number_of_game_bans: number
  economy_ban: string
  player_stats: PlayerStats
  community_visibility_state: number
  added_by: AddedBy
  time_created: number
  created: Created
}

export type MergedProfileType = {
  added_by: AddedBy
  suspect_type: string
  created: Created
  playerstats?: PlayerStats
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
