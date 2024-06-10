import UniqueEntityId from '@/core/entities/unique-entity-id'
import { User, UserCreationProps } from '@/domain/enterprise/entities/user'
import { faker } from '@faker-js/faker'

export function makeUser(override?: Partial<UserCreationProps>, id?: string) {
  return User.create(
    {
      name: faker.person.firstName('male'),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id ? new UniqueEntityId(id) : undefined,
  )
}
