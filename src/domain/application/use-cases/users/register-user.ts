import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../../repositories/users-repository'
import { Encrypter } from '../../cryptography/encrypter'
import { User } from '@/domain/enterprise/entities/user'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'

export interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export type RegisterUserUseCaseResponse = Either<UserAlreadyExistsError, null>

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encypter: Encrypter,
  ) {}

  async execute(
    props: RegisterUserUseCaseRequest,
  ): Promise<RegisterUserUseCaseResponse> {
    const existingUser = await this.usersRepository.findByEmail(props.email)
    if (existingUser) return left(new UserAlreadyExistsError(props.email))

    const newUser = User.create(props)
    newUser.password = await this.encypter.hash(newUser.password)
    await this.usersRepository.create(newUser)

    return right(null)
  }
}
