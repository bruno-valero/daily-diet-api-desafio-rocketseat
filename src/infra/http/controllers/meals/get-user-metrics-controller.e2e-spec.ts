import app from '@/infra/app'
import { PrismaClient } from '@prisma/client'
import request from 'supertest'

const prisma = new PrismaClient()

describe('create meal controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a meal', async () => {
    await request(app.server).post('/users').send({
      name: 'bruno',
      email: 'bruno2@gmail.com',
      password: '123',
    })

    const authResp = await request(app.server).post('/sessions').send({
      email: 'bruno2@gmail.com',
      password: '123',
    })

    const token = authResp.body.token

    for (let i = 1; i <= 22; i++) {
      const sequence1 = i >= 2 && i <= 6 // 5
      const sequence2 = i >= 10 && i <= 13 // 4
      const sequence3 = i >= 15 && i <= 21 // 7

      const isInDiet = sequence1 || sequence2 || sequence3

      const currTimestamp = new Date().getTime()

      await request(app.server)
        .post('/meals')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'meal errado 2.2',
          description: 'testing',
          isInDiet,
          dateTime: new Date(currTimestamp + 50).toISOString(),
        })
    }

    const mealsBefore = await prisma.meal.findMany()

    const sutResp = await request(app.server)
      .get(`/meals/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(sutResp.statusCode).toEqual(200)
    expect(sutResp.body.metrics).toEqual(
      expect.objectContaining({
        totalMeals: 22,
        mealsInDiet: 16,
        mealsNotInDiet: 6,
        bestInDietSequence: 7,
      }),
    )
    expect(authResp.statusCode).toEqual(200)
    expect(authResp.body.token).toEqual(expect.any(String))
    expect(mealsBefore).toHaveLength(22)
  })
})
