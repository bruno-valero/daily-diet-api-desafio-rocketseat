import { Either, right } from '@/core/either'
import { MealsRepository } from '../../repositories/meals-repository'
import { Meal } from '@/domain/enterprise/entities/meal'

export interface FetchMealsUseCaseRequest {
  userId: string
  page: number
}

export type FetchMealsUseCaseResponse = Either<
  null,
  {
    meals: Meal[]
  }
>

export class FetchMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
    page,
  }: FetchMealsUseCaseRequest): Promise<FetchMealsUseCaseResponse> {
    const meals = await this.mealsRepository.fetchMany({ page }, userId)

    return right({ meals })
  }
}
