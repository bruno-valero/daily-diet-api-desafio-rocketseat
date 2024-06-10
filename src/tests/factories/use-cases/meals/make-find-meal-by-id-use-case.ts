import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { FindMealByIdUseCase } from '@/domain/application/use-cases/meals/find-meal-by-id-use-case'
import { InMemoryMealsRepository } from '@/tests/respositories/in-memory-meals-repository'

export function makeFindMealByIdUseCase(props?: {
  mealsRepoSub?: MealsRepository
}) {
  const mealsRepository = props?.mealsRepoSub ?? new InMemoryMealsRepository()

  const useCase = new FindMealByIdUseCase(mealsRepository)

  return {
    useCase,
    dependencies: {
      mealsRepository,
    },
  }
}
