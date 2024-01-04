const app = require('../src/index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('POST /user', () => {
  test('should respond with code 200', async () => {
    try {
      const response = await request
      .post('/users/register')
      .send({
          name: 'Jean',
          email: 'jean.doe@example.com',  // change de mail (unique)
          password: 'motdepassesecurise',
      })
      .expect(201);

      console.log(response.statusCode);
    } catch (err) {
      throw err;
    }
  },15000);
});

describe('POST /anime', () => {
  test('should respond with code 200', async () => {
    try {
      const response = await request
        .post('/animes')
        .send({
          userId: 2,
          animeImg: 'https://example.com/anime.jpg',
          animeName: 'Test Anime',
          animeDescription: 'This is a test anime.',
          animeProducer: 'Test Producer',
        })
        .expect(200);

      console.log(response.statusCode);
    } catch (err) {
      throw err;
    }
  });
});

