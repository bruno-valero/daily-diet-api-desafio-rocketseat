import UniqueEntityId from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'
import { User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    const mappedUser = User.create(
      {
        email: user.email,
        name: user.name,
        password: user.passwordHash,
        createdAt: user.createdAt,
      },
      new UniqueEntityId(user.id),
    )
    return mappedUser
  }

  static domainToPrisma(user: User): PrismaUser {
    const mappedUser: PrismaUser = {
      id: user.id.value,
      email: user.email,
      name: user.name,
      passwordHash: user.password,
      createdAt: user.createdAt,
    }

    return mappedUser
  }
}
