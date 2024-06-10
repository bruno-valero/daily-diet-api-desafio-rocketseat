import Entity from '@/core/entities/entity'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  name: string
  email: string
  password: string
  createdAt: Date
}

export type UserCreationProps = Optional<UserProps, 'createdAt'>

export class User extends Entity<UserProps> {
  static create(props: UserCreationProps, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? new UniqueEntityId(),
    )

    return user
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get createdAt() {
    return this.props.createdAt
  }
}
