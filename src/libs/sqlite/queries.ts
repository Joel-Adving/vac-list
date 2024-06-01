import { FullProfileType, SuspectType } from '@/types'
import { sqlite } from '.'

export async function getSuspects() {
  try {
    const suspects = await sqlite.all('SELECT * FROM suspects')
    return suspects.map((suspect: any) => ({
      ...suspect,
      added_by: JSON.parse(suspect.added_by),
      created: JSON.parse(suspect.created)
    })) as SuspectType[]
  } catch (err) {
    console.error('Error fetching profiles:', err)
    throw err
  }
}

export async function insertSuspect(suspect: SuspectType) {
  const query = `
    INSERT INTO suspects (steam_id, suspect_type, added_by, created) VALUES (?, ?, ?, ?)
  `

  try {
    await sqlite.run(query, [
      suspect.steam_id,
      suspect.suspect_type,
      JSON.stringify(suspect.added_by),
      JSON.stringify(suspect.created)
    ])
    console.log('Suspect inserted successfully')
  } catch (err) {
    console.error('Error inserting suspect:', err)
    throw err
  }
}

export async function insertProfile(profile: FullProfileType) {
  const query = `
    INSERT INTO profiles (
      steam_id, suspect_type, persona_name, profile_state, profile_url, avatar,
      avatar_medium, avatar_full, avatar_hash, persona_state, primary_clan_id,
      persona_state_flags, community_banned, vac_banned, number_of_vac_bans,
      days_since_last_ban, number_of_game_bans, economy_ban, player_stats,
      community_visibility_state, added_by, time_created, created
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  try {
    await sqlite.run(query, [
      profile.steam_id,
      profile.suspect_type,
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
      JSON.stringify(profile.added_by),
      profile.time_created,
      JSON.stringify(profile.created)
    ])
    console.log('Profile inserted successfully')
  } catch (err) {
    console.error('Error inserting profile:', err)
    throw err
  }
}

export async function getProfiles() {
  try {
    const profiles = await sqlite.all('SELECT * FROM profiles')
    return profiles.map((profile: any) => ({
      ...profile,
      player_stats: JSON.parse(profile.player_stats),
      added_by: JSON.parse(profile.added_by),
      created: JSON.parse(profile.created)
    }))
  } catch (err) {
    console.error('Error fetching profiles:', err)
    throw err
  }
}
