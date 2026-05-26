import { getCurrentUser } from '@/lib/auth'
import { jsonResponse } from '@/lib/api-utils'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return Response.json({ user: null }, { status: 200 })
    }
    return jsonResponse({ user })
  } catch {
    return Response.json({ user: null }, { status: 200 })
  }
}
