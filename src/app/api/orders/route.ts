import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/lib/api-utils'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = Number(searchParams.get('limit') || '50')

    const where: Record<string, unknown> = {}
    if (status) where.status = status

    const orders = await prisma.order.findMany({
      where,
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return jsonResponse(orders)
  } catch {
    return errorResponse('Erreur serveur', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customerId, ...orderData } = body

    const order = await prisma.order.create({
      data: {
        ...orderData,
        customerId,
        items: {
          create: items.map((item: { productId: number; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { customer: true, items: { include: { product: true } } },
    })

    return jsonResponse(order, 201)
  } catch {
    return errorResponse('Erreur de création', 500)
  }
}
