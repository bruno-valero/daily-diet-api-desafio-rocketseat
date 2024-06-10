import { makeCreateMealUseCase } from '@/tests/factories/use-cases/meals/make-create-meal-use-case'

describe('create meal case', () => {
  let sut = makeCreateMealUseCase()
  beforeEach(() => {
    sut = makeCreateMealUseCase()
  })

  it('should be able to create a new meal', async () => {
    await sut.useCase.execute({
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

    expect(meals).toHaveLength(1)
    expect(meals[0]).toEqual(
      expect.objectContaining({
        name: 'teste',
      }),
    )
  })
})
