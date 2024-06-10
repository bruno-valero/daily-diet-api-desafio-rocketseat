import Entity from '@/core/entities/entity'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface MealProps {
  name: string
  description: string
  dateTime: Date
  isInDiet: boolean
  createdAt: Date
  updatedAt: Date | null
}

export type MealCreationProps = Optional<MealProps, 'createdAt' | 'updatedAt'>

export class Meal extends Entity<MealProps> {
  static create(props: MealCreationProps, id?: UniqueEntityId) {
    const meal = new Meal(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id ?? new UniqueEntityId(),
    )

    return meal
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get dateTime() {
    return this.props.dateTime
  }

  set dateTime(dateTime: Date) {
    this.props.dateTime = dateTime
    this.touch()
  }

  get isInDiet() {
    return this.props.isInDiet
  }

  set isInDiet(isInDiet: boolean) {
    this.props.isInDiet = isInDiet
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
