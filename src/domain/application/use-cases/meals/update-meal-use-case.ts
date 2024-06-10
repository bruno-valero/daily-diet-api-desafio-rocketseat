import { Either, left, right } from '@/core/either'
import { MealsRepository } from '../../repositories/meals-repository'
import { Meal } from '@/domain/enterprise/entities/meal'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import UniqueEntityId from '@/core/entities/unique-entity-id'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'

export interface UpdateMealUseCaseRequest {
  id: string
  userId: string
  name: string
  description: string
  dateTime: Date
  isInDiet: boolean
}

export type UpdateMealUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  null
>

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    userId,
    ...props
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const existentMeal = await this.mealsRepository.findById(id, userId)

    if (!existentMeal) return left(new ResourceNotFoundError())

    const mealCreatorId = existentMeal.createdBy.value

    if (mealCreatorId !== userId) return left(new UnauthorizedError())

    const newMeal = Meal.create(
      { ...props, createdBy: mealCreatorId },
      new UniqueEntityId(id),
    )

    await this.mealsRepository.update(newMeal, userId)

    return right(null)
  }
}
