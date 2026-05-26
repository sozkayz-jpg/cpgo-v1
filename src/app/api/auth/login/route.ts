import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { jsonResponse, errorResponse } from '@/lib/api-utils'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return errorResponse('Email et mot de passe requis')
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return errorResponse('Utilisateur non trouvé', 404)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return errorResponse('Mot de passe incorrect', 401)
    }

    const token = await signToken({ sub: String(user.id), email: user.email })

    return jsonResponse({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    })
  } catch {
    return errorResponse('Erreur serveur', 500)
  }
}
