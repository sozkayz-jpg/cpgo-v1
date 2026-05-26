import { prisma } from '@/lib/prisma'
import { jsonResponse, errorResponse } from '@/lib/api-utils'

export async function GET() {
  try {
    const theme = await prisma.theme.findFirst()
    if (!theme) {
      const newTheme = await prisma.theme.create({ data: {} })
      return jsonResponse(newTheme)
    }
    return jsonResponse(theme)
  } catch {
    return errorResponse('Erreur serveur', 500)
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const theme = await prisma.theme.findFirst()
    if (!theme) {
      const newTheme = await prisma.theme.create({ data: body })
      return jsonResponse(newTheme)
    }
    const updated = await prisma.theme.update({
      where: { id: theme.id },
      data: body,
    })
    return jsonResponse(updated)
  } catch {
    return errorResponse('Erreur de mise à jour', 500)
  }
}
