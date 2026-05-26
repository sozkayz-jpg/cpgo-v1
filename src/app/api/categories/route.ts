import { prisma } from '@/lib/prisma'
import { jsonResponse } from '@/lib/api-utils'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    })
    return jsonResponse(categories)
  } catch {
    return jsonResponse({ error: 'Erreur serveur' }, 500)
  }
}
