import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/lib/api-utils'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    })
    if (!product) return errorResponse('Produit non trouvé', 404)
    return jsonResponse(product)
  } catch {
    return errorResponse('Erreur serveur', 500)
  }
}
