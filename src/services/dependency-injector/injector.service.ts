export type Injector = {
  providers: Record<string, unknown>
}

const injector: Injector = {
  providers: {}
}

export const initProviders = (providers: Record<string, unknown> = {}) => {
  injector.providers = { ...providers }
}

export const addProviders = (providers: Record<string, unknown>) => {
  injector.providers = {
    ...injector.providers,
    ...providers
  }
}

export const inject = <T>(name: string): T => {
  const provider = injector.providers[name] as T
  if (!provider) {
    throw new Error(`Injector Error: no provider found for ${name}`)
  }
  return provider
}
