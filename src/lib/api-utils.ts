export function jsonResponse(data: unknown, status = 200) {
  return Response.json(data, { status })
}

export function errorResponse(message: string, status = 400) {
  return Response.json({ error: message }, { status })
}

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}
