const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);
const app = require('../src/index.js');
const supertest = require('supertest');
const request = supertest(app);
let createdUserId;

describe('User Registration Integration Tests', () => {


  test('Registers a new user successfully', async () => {
    const userData = {
      name: 'Jean',
      email: 'jean.doe@example.com',
      password: 'password456',
    };

    const response = await request
      .post('/users/register')
      .send(userData)
      .expect(201);

      createdUserId = response.body.userId.id;


      expect(createdUserId).toBeDefined();
    }, 15000);

  test('Returns 400 for duplicate email', async () => {
    const userData = {
      name: 'Jane Doe',
      email: 'jean.doe@example.com', // Duplicate email
      password: 'password456',
    };

    const response = await request
      .post('/users/register')
      .send(userData)
      .expect(400);

    console.log(response.body);
    expect(response.body.error).toBe(
      'Email is already in use. Please choose a different email.'
    );
  });
});

describe('Anime Integration Tests', () => {
  test('Registers a new anime successfully', async () => {
    if (!createdUserId) {
      throw new Error('User not registered');
    }
    const animeData = {
      userId: createdUserId,
      animeImg: 'https://example.com/anime.jpg',
      animeName: 'Test Anime',
      animeDescription: 'This is a test anime.',
      animeProducer: 'Test Producer',
    };

    const response = await request
      .post('/animes')
      .send(animeData)
      .expect(200);

      console.log(response.statusCode);
      console.log(response.body);
  });

  afterAll(async () => {
    // Clean up the database after running all tests
    await knex('users').del();
  });
});

