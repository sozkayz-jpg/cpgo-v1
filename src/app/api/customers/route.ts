import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/lib/api-utils'

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: { orders: { select: { id: true, status: true, total: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return jsonResponse(customers)
  } catch {
    return errorResponse('Erreur serveur', 500)
  }
}
