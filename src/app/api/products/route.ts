import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/lib/api-utils'
import { NextRequest } from 'next/server'

// GET /api/products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (category) where.categoryId = Number(category)
    if (status) where.status = status
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { reference: { contains: search } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })

    return jsonResponse(products)
  } catch {
    return errorResponse('Erreur serveur', 500)
  }
}

// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const product = await prisma.product.create({
      data: body,
      include: { category: true },
    })
    return jsonResponse(product, 201)
  } catch {
    return errorResponse('Erreur de création', 500)
  }
}
