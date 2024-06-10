import { User } from '@/domain/enterprise/entities/user'

export interface UsersRepository {
  create(user: User): Promise<User>
  findById(id: string): Promise<User | null>
}
