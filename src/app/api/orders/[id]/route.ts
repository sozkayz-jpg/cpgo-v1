import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/lib/api-utils'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: body,
      include: { customer: true, items: { include: { product: true } } },
    })
    return jsonResponse(order)
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
    await prisma.order.delete({ where: { id: Number(id) } })
    return jsonResponse({ success: true })
  } catch {
    return errorResponse('Erreur de suppression', 500)
  }
}
