import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/lib/api-utils'

export async function GET() {
  try {
    const pages = await prisma.sEOPage.findMany({
      include: { product: { select: { id: true, name: true, slug: true } } },
      orderBy: { score: 'desc' },
    })
    return jsonResponse(pages)
  } catch {
    return errorResponse('Erreur serveur', 500)
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...data } = body
    const page = await prisma.sEOPage.update({
      where: { id: Number(id) },
      data,
    })
    return jsonResponse(page)
  } catch {
    return errorResponse('Erreur de mise à jour', 500)
  }
}
