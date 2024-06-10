import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = []
  async create(user: User): Promise<User> {
    this.items.push(user)
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.value === id)
    return user ?? null
  }
}
