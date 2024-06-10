import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { UpdateMealUseCase } from '@/domain/application/use-cases/meals/update-meal-use-case'
import { InMemoryMealsRepository } from '@/tests/respositories/in-memory-meals-repository'

export function makeUpdateMealUseCase(props?: {
  mealsRepoSub?: MealsRepository
}) {
  const mealsRepository = props?.mealsRepoSub ?? new InMemoryMealsRepository()

  const useCase = new UpdateMealUseCase(mealsRepository)

  return {
    useCase,
    dependencies: {
      mealsRepository,
    },
  }
}
