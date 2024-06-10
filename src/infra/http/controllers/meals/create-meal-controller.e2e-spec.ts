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

    const sutResp = await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'meal errado 2.2',
        description: 'testing',
        isInDiet: false,
        dateTime: '2024-06-10T11:09:14.535Z',
      })

    const meals = await prisma.meal.findMany()

    expect(sutResp.statusCode).toEqual(201)
    expect(authResp.statusCode).toEqual(200)
    expect(authResp.body.token).toEqual(expect.any(String))
    expect(meals).toHaveLength(1)
  })
})
