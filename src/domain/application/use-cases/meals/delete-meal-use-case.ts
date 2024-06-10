import { Either, left, right } from '@/core/either'
import { MealsRepository } from '../../repositories/meals-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UnauthorizedError } from '@/core/errors/errors/unauthorized-error'

export interface DeleteMealUseCaseRequest {
  id: string
  userId: string
}

export type DeleteMealUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorizedError,
  null
>

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    userId,
  }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const existentMeal = await this.mealsRepository.findById(id, userId)

    if (!existentMeal) return left(new ResourceNotFoundError())

    const mealCreatorId = existentMeal.createdBy.value

    if (mealCreatorId !== userId) return left(new UnauthorizedError())

    await this.mealsRepository.delete(id, userId)

    return right(null)
  }
}
