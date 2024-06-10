import { makeCreateMealUseCase } from '@/tests/factories/use-cases/meals/make-create-meal-use-case'
import { makeUpdateMealUseCase } from '@/tests/factories/use-cases/meals/make-update-meal-use-case'

describe('update meal case', () => {
  let createMeal = makeCreateMealUseCase()
  let sut = makeUpdateMealUseCase({
    mealsRepoSub: createMeal.dependencies.mealsRepository,
  })
  beforeEach(() => {
    createMeal = makeCreateMealUseCase()
    sut = makeUpdateMealUseCase({
      mealsRepoSub: createMeal.dependencies.mealsRepository,
    })
  })

  it('should be able to update a meal', async () => {
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
      name: 'teste editado',
      dateTime: new Date(),
      description: 'desc editada',
      isInDiet: false,
    })

    const mealsUpdated = await sut.dependencies.mealsRepository.fetchMany(
      {
        page: 1,
      },
      '123',
    )

    expect(sutResp.isRight()).toBeTruthy()
    expect(mealsUpdated).toHaveLength(1)
    expect(mealsUpdated[0]).toEqual(
      expect.objectContaining({
        name: 'teste editado',
      }),
    )
  })

  it('should not be able to update a meal created by another user', async () => {
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
      name: 'teste editado',
      dateTime: new Date(),
      description: 'desc editada',
      isInDiet: false,
    })

    const mealsNotUpdated = await sut.dependencies.mealsRepository.fetchMany(
      {
        page: 1,
      },
      '123',
    )

    expect(sutResp.isLeft()).toBeTruthy()
    expect(mealsNotUpdated).toHaveLength(1)
    expect(mealsNotUpdated[0]).toEqual(
      expect.objectContaining({
        name: 'teste',
      }),
    )
  })

  it('should not be able to update an inexistent meal', async () => {
    const sutResp = await sut.useCase.execute({
      userId: '132',
      id: 'inexistent id',
      name: 'teste editado',
      dateTime: new Date(),
      description: 'desc editada',
      isInDiet: false,
    })

    expect(sutResp.isLeft()).toBeTruthy()
  })
})
