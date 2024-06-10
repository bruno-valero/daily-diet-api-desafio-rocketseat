import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../../repositories/users-repository'
import { Encrypter } from '../../cryptography/encrypter'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Encoder } from '../../cryptography/encoder'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'

export interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

export type AuthenticateUserUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {
    token: string
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encypter: Encrypter,
    private encoder: Encoder,
  ) {}

  async execute(
    props: AuthenticateUserUseCaseRequest,
  ): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(props.email)

    if (!user) return left(new ResourceNotFoundError())

    const isValidPassword = await this.encypter.compare(
      props.password,
      user.password,
    )

    if (!isValidPassword) return left(new UnauthorizedError())

    const token = await this.encoder.encode({ sub: user.id.value })

    return right({ token })
  }
}
