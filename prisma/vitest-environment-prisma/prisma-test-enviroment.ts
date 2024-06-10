import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL)
    throw new Error('provide a DATABASE_URL environment variable.')

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID()
    const DATABASE_URL = generateDatabaseUrl(schema)
    process.env.DATABASE_URL = DATABASE_URL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
