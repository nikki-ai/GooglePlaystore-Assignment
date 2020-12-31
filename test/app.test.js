const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('/', () => {
  it('should return a message from GET /', () => {
    return supertest(app).get('/').expect(200, 'Google Playstore assignment');
  });

  it('/apps should return an array of at least one and a json response and all keys', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-type', /json/)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);

        const gApps = res.body[0];

        expect(gApps).to.include.all.keys(
          'App',
          'Category',
          'Rating',
          'Reviews',
          'Size',
          'Installs',
          'Type',
          'Price',
          'Content Rating',
          'Genres',
          'Last Updated',
          'Current Ver',
          'Android Ver'
        );
      });
  });
});
