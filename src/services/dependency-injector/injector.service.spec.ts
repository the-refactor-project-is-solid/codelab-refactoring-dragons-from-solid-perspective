import { initProviders, addProviders, inject } from './injector.service'

describe('Given a dependency injector', () => {
  beforeEach(() => {
    initProviders()
  })

  it('should initialize with the given providers', () => {
    initProviders({ foo: 123 })
    expect(inject<number>('foo')).toBe(123)
  })

  it('should overwrite existing providers', () => {
    addProviders({ foo: 123 })
    addProviders({ foo: 456 })
    expect(inject<number>('foo')).toBe(456)
  })

  it('should add providers on top of existing ones', () => {
    addProviders({ foo: 123 })
    addProviders({ bar: 'hello' })
    expect(inject<number>('foo')).toBe(123)
    expect(inject<string>('bar')).toBe('hello')
  })

  it('should throw an error if provider does not exist', () => {
    expect(() => inject('missing')).toThrow(/no provider found/)
  })

  it('should accept object instance as provider', () => {
    const obj = { a: 1, demo: () => console.log('hello') }
    initProviders({ myObj: obj })
    const injected = inject<typeof obj>('myObj')
    expect(injected).toEqual(obj)
  })
})
