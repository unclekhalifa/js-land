import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app/app.module'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'

describe('Search', () => {
  let app: INestApplication
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  let server: any

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [AppModule],
      providers: []
    }).compile()

    app = module.createNestApplication()
    app.setGlobalPrefix('api')

    await app.init()
    server = app.getHttpServer()
  }

  beforeAll(async () => {
    await setup()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /search/companies', () => {
    it('should return a company given a number', async () => {
      const res = await request(server).get('/api/search/companies?number=12345678')
      expect(res.status).toBe(200)
      expect(res.body).toMatchSnapshot()
    })

    it('should not return a company if given wrong params', async () => {
      const res = await request(server).get('/api/search/companies?random=some-string')
      expect(res.status).toBe(400)
    })

    it('should return 400 if missing query params', async () => {
      const res = await request(server).get('/api/search/companies')
      expect(res.status).toBe(400)
    })
  })

  describe('GET /search/companies/:companyNumber', () => {
    it('should return a company given a company number', async () => {
      const res = await request(server).get('/api/search/companies/12345678')

      expect(res.status).toBe(200)
      expect(res.body).toMatchSnapshot()
    })
  })

  describe('GET /search/officers', () => {
    it('should return an officer given a number', async () => {
      const res = await request(server).get('/api/search/officers?number=12345678')
      expect(res.status).toBe(200)
      expect(res.body).toMatchSnapshot()
    })

    it('should not return an officer if given wrong params', async () => {
      const res = await request(server).get('/api/search/officers?random=some-string')
      expect(res.status).toBe(400)
    })

    it('should return 400 if missing query params', async () => {
      const res = await request(server).get('/api/search/officers')
      expect(res.status).toBe(400)
    })
  })

  describe('GET /search/officers/:officerNumber', () => {
    it('should return an officer given an officer number', async () => {
      const res = await request(server).get('/api/search/officers/12345678')

      expect(res.status).toBe(200)
      expect(res.body).toMatchSnapshot()
    })
  })

  describe('GET /search/ai', () => {
    it('should return a response', async () => {
      const res = await request(server).get('/api/search/ai?text=some-string')

      expect(res.status).toBe(200)
      expect(res.body).toMatchSnapshot()
    })
  })

})
