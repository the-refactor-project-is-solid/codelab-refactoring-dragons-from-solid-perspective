export const mockWindowFetch = (): void => {
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (typeof input === 'string' && input === '/api/dragons') {
      return createDragonResponseOk(init?.body as FormData)
    }

    // DEFAULT
    return new Response(null, { status: 404 })
  }
}

const createDragonResponseOk = (dragonBody: FormData): Response => {
  const bodyResponse: Record<string, unknown> = {}
  dragonBody.forEach((value, key) => (bodyResponse[key] = value))

  return new Response(
    JSON.stringify({
      ...bodyResponse,
      id: crypto.randomUUID()
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
