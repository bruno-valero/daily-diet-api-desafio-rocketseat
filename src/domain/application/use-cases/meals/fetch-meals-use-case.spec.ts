import { makeMeal } from '@/tests/factories/entities/make-meal'
import { makeCreateMealUseCase } from '@/tests/factories/use-cases/meals/make-create-meal-use-case'
import { makeFetchMealsUseCase } from '@/tests/factories/use-cases/meals/make-fetch-meals-use-case'

describe('find meal by id case', () => {
  let createMeal = makeCreateMealUseCase()
  let sut = makeFetchMealsUseCase({
    mealsRepoSub: createMeal.dependencies.mealsRepository,
  })
  beforeEach(() => {
    createMeal = makeCreateMealUseCase()
    sut = makeFetchMealsUseCase({
      mealsRepoSub: createMeal.dependencies.mealsRepository,
    })
  })

  it('should be able to find a meal by id', async () => {
    for (let i = 1; i <= 15; i++) {
      await createMeal.dependencies.mealsRepository.create(
        makeMeal({ createdBy: '123' }),
      )
    }

    const sutResp = await sut.useCase.execute({
      userId: '123',
      page: 1,
    })

    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value?.meals).toHaveLength(15)
  })

  it('should be able to fetch meals with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await createMeal.dependencies.mealsRepository.create(
        makeMeal({ createdBy: '123' }),
      )
    }

    const sutResp = await sut.useCase.execute({
      userId: '123',
      page: 2,
    })

    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value?.meals).toHaveLength(2)
  })

  it('should not be able to fetch meals created by another user', async () => {
    for (let i = 1; i <= 15; i++) {
      await createMeal.dependencies.mealsRepository.create(
        makeMeal({ createdBy: i <= 9 ? '123' : '1234' }),
      )
    }

    const sutResp = await sut.useCase.execute({
      userId: '123',
      page: 1,
    })

    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value?.meals).toHaveLength(9)
  })
})
