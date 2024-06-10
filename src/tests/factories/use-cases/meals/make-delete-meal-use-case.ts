import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { DeleteMealUseCase } from '@/domain/application/use-cases/meals/delete-meal-use-case'
import { InMemoryMealsRepository } from '@/tests/respositories/in-memory-meals-repository'

export function makeDeleteMealUseCase(props?: {
  mealsRepoSub?: MealsRepository
}) {
  const mealsRepository = props?.mealsRepoSub ?? new InMemoryMealsRepository()

  const useCase = new DeleteMealUseCase(mealsRepository)

  return {
    useCase,
    dependencies: {
      mealsRepository,
    },
  }
}
