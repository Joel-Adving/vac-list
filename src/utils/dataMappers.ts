import { FirestoreProfileType, MergedProfileType } from '@/types'

const mapSuspectType = {
  rageHack: 'rage',
  sus: 'suspicious',
  cheater: 'cheater'
} as any

export function mapSteamProfile(profile: MergedProfileType): any {
  return {
    steam_id: profile.steamid,
    persona_name: profile.personaname,
    profile_state: profile.profilestate,
    profile_url: profile.profileurl,
    loccountry_code: profile.loccountrycode,
    avatar: profile.avatar,
    avatar_medium: profile.avatarmedium,
    avatar_full: profile.avatarfull,
    avatar_hash: profile.avatarhash,
    persona_state: profile.personastate,
    primary_clan_id: profile.primaryclanid,
    persona_state_flags: profile.personastateflags,
    community_banned: profile.CommunityBanned,
    vac_banned: profile.VACBanned,
    number_of_vac_bans: profile.NumberOfVACBans,
    days_since_last_ban: profile.DaysSinceLastBan,
    number_of_game_bans: profile.NumberOfGameBans,
    economy_ban: profile.EconomyBan,
    player_stats: profile.playerstats,
    community_visibility_state: profile.communityvisibilitystate,
    time_created: profile.timecreated
  }
}

export function mapFirestoreSuspectToSqlite(profile: FirestoreProfileType): any {
  return {
    steam_id: profile.id,
    suspect_type: mapSuspectType[profile.suspect_type],
    added_by: profile.added_by,
    created: profile.created
  }
}

export function mapFullProfile(profile: MergedProfileType) {
  return {
    ...mapSteamProfile(profile),
    suspect_type: mapSuspectType[profile.suspect_type],
    added_by: profile.added_by,
    created: profile.created
  }
}

export function mapSqliteBoolean(value: any) {
  return value === 1
}
