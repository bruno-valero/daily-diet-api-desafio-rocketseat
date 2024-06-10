import { makeCreateMealUseCase } from '@/tests/factories/use-cases/meals/make-create-meal-use-case'
import { makeDeleteMealUseCase } from '@/tests/factories/use-cases/meals/make-delete-meal-use-case'

describe('delete meal case', () => {
  let createMeal = makeCreateMealUseCase()
  let sut = makeDeleteMealUseCase({
    mealsRepoSub: createMeal.dependencies.mealsRepository,
  })
  beforeEach(() => {
    createMeal = makeCreateMealUseCase()
    sut = makeDeleteMealUseCase({
      mealsRepoSub: createMeal.dependencies.mealsRepository,
    })
  })

  it('should be able to delete a meal', async () => {
    await createMeal.useCase.execute({
      createdBy: '123',
      name: 'teste',
      dateTime: new Date(),
      description: 'desc',
      isInDiet: false,
    })

    const meals = await sut.dependencies.mealsRepository.fetchMany(
      { page: 1 },
      '123',
    )

    const sutResp = await sut.useCase.execute({
      id: meals[0].id.value,
      userId: '123',
    })

    const mealsDeleted = await sut.dependencies.mealsRepository.fetchMany(
      {
        page: 1,
      },
      '123',
    )

    expect(sutResp.isRight()).toBeTruthy()
    expect(meals).toHaveLength(1)
    expect(mealsDeleted).toHaveLength(0)
  })

  it('should not be able to delete a meal created by another user', async () => {
    await createMeal.useCase.execute({
      createdBy: '123',
      name: 'teste',
      dateTime: new Date(),
      description: 'desc',
      isInDiet: false,
    })

    const meals = await sut.dependencies.mealsRepository.fetchMany(
      { page: 1 },
      '123',
    )

    const sutResp = await sut.useCase.execute({
      id: meals[0].id.value,
      userId: '123456',
    })

    const mealsNotDeleted = await sut.dependencies.mealsRepository.fetchMany(
      {
        page: 1,
      },
      '123',
    )

    expect(sutResp.isLeft()).toBeTruthy()
    expect(meals).toHaveLength(1)
    expect(mealsNotDeleted).toHaveLength(1)
    expect(mealsNotDeleted[0]).toEqual(
      expect.objectContaining({
        name: 'teste',
      }),
    )
  })

  it('should not be able to delete an inexistent meal', async () => {
    const sutResp = await sut.useCase.execute({
      userId: '132',
      id: 'inexistent id',
    })

    expect(sutResp.isLeft()).toBeTruthy()
  })
})
