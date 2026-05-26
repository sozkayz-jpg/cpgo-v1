import { PrismaClient } from '@prisma/client'

// ATTENTION : Cette URL est temporairement hardcodée pour que le site fonctionne sur Vercel.
// En production, remplacez par process.env.DATABASE_URL configuré dans les variables Vercel.
const DATABASE_URL = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_bUlS0LGf6Fwj@ep-quiet-scene-apps6ct5-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
