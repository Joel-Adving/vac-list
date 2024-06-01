import fs from 'fs'
import path from 'path'
import sqlite3 from 'sqlite3'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.join(__dirname, '../../')
const dbDir = path.join(rootDir, 'data')
const dbPath = process.env.DATABASE_PATH || path.join(dbDir, 'database.db')

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

export async function migrateDb() {
  const db = new sqlite3.Database(dbPath)

  const runMigration = (file: string) => {
    const filePath = path.join(rootDir, 'migrations', file)
    const sql = fs.readFileSync(filePath, 'utf-8')
    return new Promise<void>((resolve, reject) => {
      db.exec(sql, (err) => {
        if (err) {
          console.error(`Error applying migration ${file}:`, err)
          reject(err)
        } else {
          console.log(`Successfully applied migration ${file}`)
          resolve()
        }
      })
    })
  }

  try {
    const migrationDir = path.join(rootDir, 'migrations')
    if (!fs.existsSync(migrationDir)) {
      throw new Error(`Migration directory does not exist: ${migrationDir}`)
    }

    const migrationFiles = fs.readdirSync(migrationDir).filter((file) => file.endsWith('.sql'))

    for (const file of migrationFiles) {
      await runMigration(file)
    }

    console.log('Database initialized successfully')
  } catch (err) {
    console.error('Error initializing database:', err)
  } finally {
    db.close()
  }
}

migrateDb()
