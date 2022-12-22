// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';

// describe('UserController', () => {
//   let app: INestApplication;

//   it('signup as a new user then get currently logged in user', async () => {
//     const email = 'randomemail@randomemail.com';
//     const res = await request(app.getHttpServer())
//       .post('/auth/signup')
//       .send({ email, password: 'asdf' })
//       .expect(201)

//     const cookie = res.get('Set-Cookie');

//     const { body } = await request(app.getHttpServer())
//       .get('/auth/whoami')
//       .set('Cookie', cookie)
//       .expect(200);

//     expect(body.email).toEqual(email);
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = `${Math.random()}@cdkasnlfnkd.com`;
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'acjoiuahsgfsd' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get currently logged in user', async () => {
    const email = `${Math.random()}@fkjwoihedfoiashfi.com`;
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201)

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
