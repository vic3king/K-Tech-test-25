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
        .get('/comms/welcome-fresh/ff535484-6880-4653-b06e-89983ecf4ed5')
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
        .get('/comms/welcome-fresh/non-existent-id')
        .expect(404);
    });
  });

  describe('GET /comms/your-next-delivery', () => {
    it('should return next delivery message for valid user', () => {
      return request(app.getHttpServer())
        .get('/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual({
            title: 'Your next delivery for Dorian and Ocie',
            message:
              "Hey Kayleigh Wilderman! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
            totalPrice: 134,
            freeGift: true,
          });
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/comms/your-next-delivery/non-existent-id')
        .expect(404);
    });
  });
});
