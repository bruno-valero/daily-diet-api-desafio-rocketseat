import app from '@/infra/app'
import { PrismaClient } from '@prisma/client'
import request from 'supertest'

const prisma = new PrismaClient()

describe('authenticate user controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to authenticate a user', async () => {
    await request(app.server).post('/users').send({
      name: 'bruno',
      email: 'bruno2@gmail.com',
      password: '123',
    })

    const sutResp = await request(app.server).post('/sessions').send({
      email: 'bruno2@gmail.com',
      password: '123',
    })

    const getUsers = await prisma.user.findUnique({
      where: {
        email: 'bruno2@gmail.com',
      },
    })

    expect(sutResp.statusCode).toEqual(200)
    expect(getUsers).toBeTruthy()
    expect(sutResp.body.token).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    await request(app.server).post('/users').send({
      name: 'bruno',
      email: 'bruno2@gmail.com',
      password: '123',
    })

    const sutResp = await request(app.server).post('/sessions').send({
      email: 'bruno2@gmail.com',
      password: '1234',
    })

    const getUsers = await prisma.user.findUnique({
      where: {
        email: 'bruno2@gmail.com',
      },
    })

    expect(sutResp.statusCode).toEqual(401)
    expect(getUsers).toBeTruthy()
  })

  it('should not be able to authenticate a user with wrong email', async () => {
    await request(app.server).post('/users').send({
      name: 'bruno',
      email: 'bruno2@gmail.com',
      password: '123',
    })

    const sutResp = await request(app.server).post('/sessions').send({
      email: 'bruno@gmail.com',
      password: '123',
    })

    const getUsers = await prisma.user.findUnique({
      where: {
        email: 'bruno2@gmail.com',
      },
    })

    expect(sutResp.statusCode).toEqual(404)
    expect(getUsers).toBeTruthy()
  })
})
