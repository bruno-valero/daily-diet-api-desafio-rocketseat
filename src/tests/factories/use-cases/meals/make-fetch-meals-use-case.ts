import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { FetchMealsUseCase } from '@/domain/application/use-cases/meals/fetch-meals-use-case'
import { InMemoryMealsRepository } from '@/tests/respositories/in-memory-meals-repository'

export function makeFetchMealsUseCase(props?: {
  mealsRepoSub?: MealsRepository
}) {
  const mealsRepository = props?.mealsRepoSub ?? new InMemoryMealsRepository()

  const useCase = new FetchMealsUseCase(mealsRepository)

  return {
    useCase,
    dependencies: {
      mealsRepository,
    },
  }
}
