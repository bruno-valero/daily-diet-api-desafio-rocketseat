import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'
import { prisma } from '../prisma.config'
import { PrismaUserMapper } from '../../mappers/prisma-user-mapper'

export class PrismaUsersRepository implements UsersRepository {
  async create(user: User): Promise<User> {
    const prismaUser = await prisma.user.create({
      data: PrismaUserMapper.domainToPrisma(user),
    })

    return PrismaUserMapper.toDomain(prismaUser)
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!prismaUser) return null

    return PrismaUserMapper.toDomain(prismaUser)
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!prismaUser) return null

    return PrismaUserMapper.toDomain(prismaUser)
  }
}
