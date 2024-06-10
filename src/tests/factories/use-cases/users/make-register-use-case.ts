import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { RegisterUserUseCase } from '@/domain/application/use-cases/users/register-user'
import { FakeEncrypter } from '@/tests/cryptography/fake-encrypter'
import { InMemoryUsersRepository } from '@/tests/respositories/in-memory-users-repository'

export function makeRegisterUseCase(props?: {
  usersRepoSub?: UsersRepository
  encypterSub?: Encrypter
}) {
  const usersRepository = props?.usersRepoSub ?? new InMemoryUsersRepository()
  const encypter = props?.encypterSub ?? new FakeEncrypter()

  const useCase = new RegisterUserUseCase(usersRepository, encypter)

  return {
    useCase,
    dependencies: {
      usersRepository,
      encypter,
    },
  }
}
