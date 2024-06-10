import { Either, right } from '@/core/either'
import { MealsRepository } from '../../repositories/meals-repository'
import { Meal } from '@/domain/enterprise/entities/meal'

export interface CreateMealUseCaseRequest {
  createdBy: string
  name: string
  description: string
  dateTime: Date
  isInDiet: boolean
}

export type CreateMealUseCaseResponse = Either<null, null>

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    props: CreateMealUseCaseRequest,
  ): Promise<CreateMealUseCaseResponse> {
    const newMeal = Meal.create(props)

    await this.mealsRepository.create(newMeal)

    return right(null)
  }
}
