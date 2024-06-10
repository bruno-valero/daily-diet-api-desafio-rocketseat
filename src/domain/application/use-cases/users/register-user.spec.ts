import { makeRegisterUseCase } from '@/tests/factories/use-cases/users/make-register-use-case'

describe('register use case', () => {
  let sut = makeRegisterUseCase()
  beforeEach(() => {
    sut = makeRegisterUseCase()
  })

  it('should be able to register a new user', async () => {
    await sut.useCase.execute({
      email: 'bruno@test.com',
      name: 'bruno',
      password: '123456',
    })

    const user =
      await sut.dependencies.usersRepository.findByEmail('bruno@test.com')

    expect(user).toBeTruthy()
    expect(user).toEqual(
      expect.objectContaining({
        email: 'bruno@test.com',
        name: 'bruno',
      }),
    )
  })

  it("should be able to hash a user's password", async () => {
    await sut.useCase.execute({
      email: 'bruno@test.com',
      name: 'bruno',
      password: '123456',
    })

    const user =
      await sut.dependencies.usersRepository.findByEmail('bruno@test.com')

    expect(user).toBeTruthy()
    expect(
      sut.dependencies.encypter.compare('123456', user?.password ?? ''),
    ).toBeTruthy()
  })
})
