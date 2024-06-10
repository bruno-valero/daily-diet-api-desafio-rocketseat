import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { CreateMealUseCase } from '@/domain/application/use-cases/meals/create-meal-use-case'
import { InMemoryMealsRepository } from '@/tests/respositories/in-memory-meals-repository'

export function makeCreateMealUseCase(props?: {
  mealsRepoSub?: MealsRepository
}) {
  const mealsRepository = props?.mealsRepoSub ?? new InMemoryMealsRepository()

  const useCase = new CreateMealUseCase(mealsRepository)

  return {
    useCase,
    dependencies: {
      mealsRepository,
    },
  }
}
