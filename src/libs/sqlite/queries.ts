import { SteamProfile, SuspectType } from '@/types'
import { sqlite } from '.'

export async function getSuspects() {
  const suspects = await sqlite.all('SELECT * FROM suspects')
  return suspects.map((suspect: any) => ({
    ...suspect,
    added_by: JSON.parse(suspect.added_by),
    created: JSON.parse(suspect.created)
  })) as SuspectType[]
}

export async function getSuspect(steamId: string) {
  const suspect = await sqlite.get('SELECT * FROM suspects WHERE steam_id = ?', [steamId])
  if (!suspect) {
    return null
  }
  return {
    ...suspect,
    added_by: JSON.parse(suspect?.added_by),
    created: JSON.parse(suspect?.created)
  } as SuspectType
}

export async function insertSuspect(suspect: SuspectType) {
  const query = `
    INSERT INTO suspects (steam_id, suspect_type, added_by, created) VALUES (?, ?, ?, ?)
  `
  await sqlite.run(query, [
    suspect.steam_id,
    suspect.suspect_type,
    JSON.stringify(suspect.added_by),
    JSON.stringify(suspect.created)
  ])
  return { success: true }
}

export async function deleteSuspect(steamId: string) {
  await sqlite.run('DELETE FROM suspects WHERE steam_id = ?', [steamId])
  return { success: true }
}

export async function getSavedSteamProfile(steamId: string) {
  const profile = await sqlite.get('SELECT * FROM steam_profiles WHERE steam_id = ?', [steamId])
  return {
    ...profile,
    player_stats: JSON.parse(profile.player_stats)
  } as SteamProfile
}

export async function getSavedSteamProfiles() {
  const profiles = await sqlite.all('SELECT * FROM steam_profiles')
  return profiles.map((profile: any) => ({
    ...profile,
    vac_banned: !!profile.vac_banned,
    community_banned: !!profile.community_banned,
    player_stats: JSON.parse(profile.player_stats)
  }))
}

export async function insertSteamProfile(profile: SteamProfile) {
  const query = `
    INSERT INTO steam_profiles (
      steam_id, persona_name, profile_state, profile_url, avatar,
      avatar_medium, avatar_full, avatar_hash, persona_state, primary_clan_id,
      persona_state_flags, community_banned, vac_banned, number_of_vac_bans,
      days_since_last_ban, number_of_game_bans, economy_ban, player_stats,
      community_visibility_state, time_created
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  await sqlite.run(query, [
    profile.steam_id,
    profile.persona_name,
    profile.profile_state,
    profile.profile_url,
    profile.avatar,
    profile.avatar_medium,
    profile.avatar_full,
    profile.avatar_hash,
    profile.persona_state,
    profile.primary_clan_id,
    profile.persona_state_flags,
    profile.community_banned,
    profile.vac_banned,
    profile.number_of_vac_bans,
    profile.days_since_last_ban,
    profile.number_of_game_bans,
    profile.economy_ban,
    JSON.stringify(profile.player_stats),
    profile.community_visibility_state,
    profile.time_created
  ])
}

export async function updateSteamProfile(profile: SteamProfile) {
  const query = `
    UPDATE steam_profiles SET
      persona_name = ?,
      profile_state = ?,
      profile_url = ?,
      avatar = ?,
      avatar_medium = ?,
      avatar_full = ?,
      avatar_hash = ?,
      persona_state = ?,
      primary_clan_id = ?,
      persona_state_flags = ?,
      community_banned = ?,
      vac_banned = ?,
      number_of_vac_bans = ?,
      days_since_last_ban = ?,
      number_of_game_bans = ?,
      economy_ban = ?,
      player_stats = ?,
      community_visibility_state = ?,
      time_created = ?
    WHERE steam_id = ?
  `
  await sqlite.run(query, [
    profile.persona_name,
    profile.profile_state,
    profile.profile_url,
    profile.avatar,
    profile.avatar_medium,
    profile.avatar_full,
    profile.avatar_hash,
    profile.persona_state,
    profile.primary_clan_id,
    profile.persona_state_flags,
    profile.community_banned,
    profile.vac_banned,
    profile.number_of_vac_bans,
    profile.days_since_last_ban,
    profile.number_of_game_bans,
    profile.economy_ban,
    JSON.stringify(profile.player_stats),
    profile.community_visibility_state,
    profile.time_created,
    profile.steam_id
  ])
}

export const sqliteService = {
  getSuspects,
  getSuspect,
  insertSuspect,
  deleteSuspect,
  getSavedSteamProfile,
  getSavedSteamProfiles,
  insertSteamProfile,
  updateSteamProfile
}
