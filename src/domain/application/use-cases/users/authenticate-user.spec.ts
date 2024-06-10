import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'
import { makeAuthenticateUseCase } from '@/tests/factories/use-cases/users/make-authenticate-use-case'
import { makeRegisterUseCase } from '@/tests/factories/use-cases/users/make-register-use-case'

describe('authenticate use case', () => {
  let createUser = makeRegisterUseCase()
  let sut = makeAuthenticateUseCase({
    usersRepoSub: createUser.dependencies.usersRepository,
    encypterSub: createUser.dependencies.encypter,
  })
  beforeEach(() => {
    createUser = makeRegisterUseCase()
    sut = makeAuthenticateUseCase({
      usersRepoSub: createUser.dependencies.usersRepository,
      encypterSub: createUser.dependencies.encypter,
    })
  })

  it('should be able to authenticate a user', async () => {
    await createUser.useCase.execute({
      name: 'bruno',
      email: 'bruno@test.com',
      password: '123456',
    })

    const sutResp = await sut.useCase.execute({
      email: 'bruno@test.com',
      password: '123456',
    })

    const user =
      await sut.dependencies.usersRepository.findByEmail('bruno@test.com')

    expect(sutResp.isRight()).toBeTruthy()
    if (sutResp.isRight()) {
      const { token } = sutResp.value

      expect(token).toEqual(expect.any(String))
    }
    expect(user).toBeTruthy()
    expect(user).toEqual(
      expect.objectContaining({
        email: 'bruno@test.com',
        name: 'bruno',
      }),
    )
  })

  it('should not be able to authenticate a user with wrong password or email', async () => {
    await createUser.useCase.execute({
      name: 'bruno',
      email: 'bruno@test.com',
      password: '123456',
    })

    const sutResp1 = await sut.useCase.execute({
      email: 'bruno@test.com',
      password: '1234567',
    })

    const sutResp2 = await sut.useCase.execute({
      email: 'bruno@test-error.com',
      password: '123456',
    })

    const user =
      await sut.dependencies.usersRepository.findByEmail('bruno@test.com')

    expect(sutResp1.isLeft()).toBeTruthy()
    expect(sutResp2.isLeft()).toBeTruthy()
    expect(sutResp1.value).toBeInstanceOf(UnauthorizedError)
    expect(sutResp2.value).toBeInstanceOf(ResourceNotFoundError)
    expect(user).toBeTruthy()
  })

  it('should not be able to authenticate an inexistent user', async () => {
    const sutResp = await sut.useCase.execute({
      email: 'bruno@test.com',
      password: '1234567',
    })

    expect(sutResp.isLeft()).toBeTruthy()
    expect(sutResp.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
