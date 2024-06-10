import { Either, right } from '@/core/either'
import { MealsRepository } from '../../repositories/meals-repository'

export interface GetUserMetricsUseCaseRequest {
  userId: string
}

export type GetUserMetricsUseCaseResponse = Either<
  null,
  {
    metrics: {
      totalMeals: number
      mealsInDiet: number
      mealsNotInDiet: number
      bestInDietSequence: number
    }
  }
>

export class GetUserMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const totalMeals = await this.mealsRepository.countAll(userId)
    const mealsInDiet = await this.mealsRepository.countInDiet(userId)
    const mealsNotInDiet = await this.mealsRepository.countNotInDiet(userId)
    const bestInDietSequence =
      await this.mealsRepository.bestInDietSequence(userId)

    const metrics = {
      totalMeals,
      mealsInDiet,
      mealsNotInDiet,
      bestInDietSequence,
    }

    return right({ metrics })
  }
}
