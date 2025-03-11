import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';

describe('CommsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /comms/welcome-fresh', () => {
    it('should return welcome message for valid user', () => {
      return request(app.getHttpServer())
        .get('/comms/welcome-fresh')
        .query({ userId: 'ff535484-6880-4653-b06e-89983ecf4ed5' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            message:
              "Welcome to KatKin, Kayleigh Wilderman! We're super excited for Dorian and Ocie to join the KatKin club and start loving fresh!",
          });
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/comms/welcome-fresh')
        .query({ userId: 'non-existent-id' })
        .expect(404);
    });
  });
});
