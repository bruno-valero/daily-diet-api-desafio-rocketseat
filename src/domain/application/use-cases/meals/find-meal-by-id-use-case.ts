import { Either, left, right } from '@/core/either'
import { MealsRepository } from '../../repositories/meals-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'
import { Meal } from '@/domain/enterprise/entities/meal'

export interface FindMealByIdUseCaseRequest {
  id: string
  userId: string
}

export type FindMealByIdUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  {
    meal: Meal
  }
>

export class FindMealByIdUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    userId,
  }: FindMealByIdUseCaseRequest): Promise<FindMealByIdUseCaseResponse> {
    const existentMeal = await this.mealsRepository.findById(id, userId)

    if (!existentMeal) return left(new ResourceNotFoundError())

    const mealCreatorId = existentMeal.createdBy.value

    if (mealCreatorId !== userId) return left(new UnauthorizedError())

    return right({ meal: existentMeal })
  }
}
