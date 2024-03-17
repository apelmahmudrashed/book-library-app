const request = require('supertest')
const app = require('../app')

//Post endpoint
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: "Test book"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message');
  });
});

//Put endpoint
describe('Put Endpoints', () => {
    it('should create a new put', async () => {
      const res = await request(app)
        .put('/api/books/1')
        .send({
          title: "Test book",
          isAvailable: 1
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message');
    });
  });

//Get enpoint
describe('Get Endpoints', () => {
    it('should create a new get', async () => {
      const res = await request(app)
        .get('/api/books/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('isAvailable');
    });
  });

  //Get All enpoint
describe('Get Endpoints', () => {
    it('should create a new get', async () => {
      const res = await request(app)
        .get('/api/books');
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0]).toHaveProperty('isAvailable');
    });
  });


//Delete endpoint
describe('Delete Endpoints', () => {
    it('should create a new delete', async () => {
      const res = await request(app)
        .delete('/api/books/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });
  });
