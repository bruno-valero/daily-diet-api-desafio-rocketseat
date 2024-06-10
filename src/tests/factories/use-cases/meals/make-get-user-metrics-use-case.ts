import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { GetUserMetricsUseCase } from '@/domain/application/use-cases/meals/get-user-metrics-use-case'
import { InMemoryMealsRepository } from '@/tests/respositories/in-memory-meals-repository'

export function makeGetUserMetricsUseCase(props?: {
  mealsRepoSub?: MealsRepository
}) {
  const mealsRepository = props?.mealsRepoSub ?? new InMemoryMealsRepository()

  const useCase = new GetUserMetricsUseCase(mealsRepository)

  return {
    useCase,
    dependencies: {
      mealsRepository,
    },
  }
}
