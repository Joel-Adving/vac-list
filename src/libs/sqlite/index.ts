import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'

export const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'database.db')

export const sqlite = await open({
  filename: dbPath,
  driver: sqlite3.Database
})
