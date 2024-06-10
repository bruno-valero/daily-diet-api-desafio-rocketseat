import { makeMeal } from '@/tests/factories/entities/make-meal'
import { makeCreateMealUseCase } from '@/tests/factories/use-cases/meals/make-create-meal-use-case'
import { makeGetUserMetricsUseCase } from '@/tests/factories/use-cases/meals/make-get-user-metrics-use-case'

describe('get user metrics by id case', () => {
  let createMeal = makeCreateMealUseCase()
  let sut = makeGetUserMetricsUseCase({
    mealsRepoSub: createMeal.dependencies.mealsRepository,
  })
  beforeEach(() => {
    createMeal = makeCreateMealUseCase()
    sut = makeGetUserMetricsUseCase({
      mealsRepoSub: createMeal.dependencies.mealsRepository,
    })
  })

  it("should be able to get a user's metrics", async () => {
    for (let i = 1; i <= 40; i++) {
      const sequence1 = i >= 2 && i <= 10 // 9
      const sequence2 = i >= 20 && i <= 25 // 6
      const sequence3 = i >= 28 && i <= 40 // 13

      const isInDiet = sequence1 || sequence2 || sequence3

      const currTimestamp = new Date().getTime()

      await createMeal.dependencies.mealsRepository.create(
        makeMeal({
          createdBy: '123',
          isInDiet,
          dateTime: new Date(currTimestamp + i * 50),
        }),
      )
    }

    const sutResp = await sut.useCase.execute({
      userId: '123',
    })

    console.log('sutResp.value?.metrics', sutResp.value?.metrics)
    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value?.metrics.bestInDietSequence).toEqual(13)
  })

  it('should not be able to get metrics from another user', async () => {
    for (let i = 1; i <= 15; i++) {
      await createMeal.dependencies.mealsRepository.create(
        makeMeal({ createdBy: '1234', isInDiet: i <= 8 }),
      )
    }

    const sutResp = await sut.useCase.execute({
      userId: '123',
    })

    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value?.metrics).toEqual(
      expect.objectContaining({
        totalMeals: 0,
        mealsInDiet: 0,
        mealsNotInDiet: 0,
        bestInDietSequence: 0,
      }),
    )
  })
})
