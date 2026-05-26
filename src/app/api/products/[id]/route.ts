import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/lib/api-utils'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { category: true, seo: true },
    })
    if (!product) return errorResponse('Produit non trouvé', 404)
    return jsonResponse(product)
  } catch {
    return errorResponse('Erreur serveur', 500)
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: body,
      include: { category: true },
    })
    return jsonResponse(product)
  } catch {
    return errorResponse('Erreur de mise à jour', 500)
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.product.delete({ where: { id: Number(id) } })
    return jsonResponse({ success: true })
  } catch {
    return errorResponse('Erreur de suppression', 500)
  }
}
