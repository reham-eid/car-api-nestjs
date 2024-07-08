import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { startUp } from 'src/startup-app';

describe('Authentication Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    startUp(app);
    await app.init();
  });

  it('/signUp (POST) ', () => {
    const email = '2001rehamoo1000@gmail.com';
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        email,
        password: 'P2assword#123',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('/signUp with a valid session or token (POST) ', async () => {
    // SignUp as new user then get currently logged in user
    const email = '2001rehamoo1000@gmail.com';
    const res = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        email,
        password: 'P2assword#123',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/protected')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
