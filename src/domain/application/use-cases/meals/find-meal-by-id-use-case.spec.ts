import { makeCreateMealUseCase } from '@/tests/factories/use-cases/meals/make-create-meal-use-case'
import { makeFindMealByIdUseCase } from '@/tests/factories/use-cases/meals/make-find-meal-by-id-use-case'

describe('find meal by id case', () => {
  let createMeal = makeCreateMealUseCase()
  let sut = makeFindMealByIdUseCase({
    mealsRepoSub: createMeal.dependencies.mealsRepository,
  })
  beforeEach(() => {
    createMeal = makeCreateMealUseCase()
    sut = makeFindMealByIdUseCase({
      mealsRepoSub: createMeal.dependencies.mealsRepository,
    })
  })

  it('should be able to find a meal by id', async () => {
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

    expect(meals).toHaveLength(1)
    expect(sutResp.isRight()).toBeTruthy()
    expect(sutResp.value).toEqual({
      meal: expect.objectContaining({
        name: 'teste',
      }),
    })
  })

  it('should not be able to find a meal created by another user', async () => {
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

    expect(meals).toHaveLength(1)
    expect(sutResp.isLeft()).toBeTruthy()
  })

  it('should not be able to find an inexistent meal', async () => {
    const sutResp = await sut.useCase.execute({
      userId: '132',
      id: 'inexistent id',
    })

    expect(sutResp.isLeft()).toBeTruthy()
  })
})
