export const mockWindowFetch = (): void => {
  window.fetch = async (input: RequestInfo | URL): Promise<Response> => {
    if (typeof input === 'string' && input.startsWith('/api/analytics')) {
      return createGenericResponseOk()
    }

    if (typeof input === 'string' && input.startsWith('/api/sendEmailTo')) {
      return createGenericResponseOk()
    }

    // DEFAULT
    return new Response(null, { status: 404 })
  }
}

const createGenericResponseOk = (): Response => {
  return new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } })
}
