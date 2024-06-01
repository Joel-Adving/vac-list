import { FirestoreProfileType, MergedProfileType } from '@/types'

const mapSuspectType = {
  rageHack: 'rage',
  sus: 'suspecious'
} as any

export function mapMergedProfileToDbProfile(originalProfile: MergedProfileType): any {
  return {
    steam_id: originalProfile.id,
    suspect_type: mapSuspectType[originalProfile.suspect_type],
    persona_name: originalProfile.personaname,
    profile_state: originalProfile.profilestate,
    profile_url: originalProfile.profileurl,
    avatar: originalProfile.avatar,
    avatar_medium: originalProfile.avatarmedium,
    avatar_full: originalProfile.avatarfull,
    avatar_hash: originalProfile.avatarhash,
    persona_state: originalProfile.personastate,
    primary_clan_id: originalProfile.primaryclanid,
    persona_state_flags: originalProfile.personastateflags,
    community_banned: originalProfile.CommunityBanned,
    vac_banned: originalProfile.VACBanned,
    number_of_vac_bans: originalProfile.NumberOfVACBans,
    days_since_last_ban: originalProfile.DaysSinceLastBan,
    number_of_game_bans: originalProfile.NumberOfGameBans,
    economy_ban: originalProfile.EconomyBan,
    player_stats: originalProfile.playerstats,
    community_visibility_state: originalProfile.communityvisibilitystate,
    added_by: originalProfile.added_by,
    time_created: originalProfile.timecreated,
    created: originalProfile.created
  }
}

export function mapFirestoreProfileToSqlite(originalProfile: FirestoreProfileType): any {
  return {
    steam_id: originalProfile.id,
    suspect_type: mapSuspectType[originalProfile.suspect_type],
    added_by: originalProfile.added_by,
    created: originalProfile.created
  }
}
