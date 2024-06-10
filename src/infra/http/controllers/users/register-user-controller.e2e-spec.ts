import app from '@/infra/app'
import { BcryptEncrypter } from '@/infra/auth/cryptography/bcrypt-encrypter'
import { PrismaClient } from '@prisma/client'
import request from 'supertest'

const prisma = new PrismaClient()

describe('register user controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  it('should be able to register a new user', async () => {
    const sutResp = await request(app.server).post('/users').send({
      name: 'bruno',
      email: 'bruno@gmail.com',
      password: '123',
    })

    const getUsers = await prisma.user.findMany()

    expect(sutResp.statusCode).toEqual(201)
    expect(getUsers).toHaveLength(1)
    expect(getUsers).toEqual([
      expect.objectContaining({
        name: 'bruno',
        email: 'bruno@gmail.com',
      }),
    ])
  })

  it("should be able to hash the new user's password", async () => {
    const sutResp = await request(app.server).post('/users').send({
      name: 'bruno',
      email: 'bruno2@gmail.com',
      password: '123',
    })

    const getUsers = await prisma.user.findUnique({
      where: {
        email: 'bruno2@gmail.com',
      },
    })
    const encrypter = new BcryptEncrypter()

    expect(sutResp.statusCode).toEqual(201)
    expect(encrypter.compare('123', getUsers?.email ?? ''))
  })

  it('should not be able to create a user with an existing email', async () => {
    const sutResp = await request(app.server).post('/users').send({
      name: 'bruno',
      email: 'bruno@gmail.com',
      password: '123',
    })

    expect(sutResp.statusCode).toEqual(409)
  })
})
