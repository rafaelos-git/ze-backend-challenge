const fs = require('fs');
const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server/app');

chai.use(chaiHttp);

describe('Pdvs', () => {
  before((done) => {
    const sSeeds = fs.readFileSync('./server/database/seed/pdvs.json');
    const seeds = JSON.parse(sSeeds);
    mongoose.connection.collection('pdvs')
      .deleteMany({});
    mongoose.connection.collection('pdvs')
      .insertMany(seeds.pdvs)
      .then(() => done());
  });

  describe('/POST /pdvs', () => {
    const pdv = {
      id: '0',
      tradingName: 'Test PDV',
      ownerName: 'Mocha',
      document: '00.000.000/0000000',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [
                -43.36556,
                -22.99669,
              ],
              [
                -43.36539,
                -23.01928,
              ],
              [
                -43.26583,
                -23.01802,
              ],
            ],
          ],
        ],
      },
      address: {
        type: 'Point',
        coordinates: [
          -43.297500,
          -23.013200,
        ],
      },
    };

    it('should POST a pdv', (done) => {
      chai.request(app)
        .post('/v1/pdvs')
        .send(pdv)
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.a.property('_id');
          expect(res.body).to.have.a.property('id');
          expect(res.body).to.have.a.property('tradingName');
          expect(res.body).to.have.a.property('ownerName');
          expect(res.body).to.have.a.property('document');
          expect(res.body).to.have.a.property('coverageArea');
          expect(res.body).to.have.a.property('address');
          expect(res.body).to.have.a.property('created_at');
          expect(res.body).to.have.a.property('updated_at');
          done();
        });
    });

    it('should reponse with validation error', (done) => {
      const {
        id,
        ...pdvWithoutId
      } = pdv;

      chai.request(app)
        .post('/v1/pdvs')
        .send(pdvWithoutId)
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.a.property('error');
          expect(res.body).to.have.a.property('type');
          expect(res.body.type).to.be.equals('ValidationError');
          expect(res.body).to.have.a.property('messages');
          expect(res.body.messages).to.be.a('array');
          done();
        });
    });

    it('should reponse with mongo error', (done) => {
      pdv.id = '0';

      chai.request(app)
        .post('/v1/pdvs')
        .send(pdv)
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.a.property('error');
          expect(res.body).to.have.a.property('type');
          expect(res.body.type).to.be.equals('MongoError');
          expect(res.body).to.have.a.property('messages');
          expect(res.body.messages).to.be.a('array');
          done();
        });
    });
  });

  describe('/GET /pdvs/:id', () => {
    it('should get a pdv', (done) => {
      chai.request(app)
        .get('/v1/pdvs/0')
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.a.property('_id');
          expect(res.body).to.have.a.property('id');
          expect(res.body).to.have.a.property('tradingName');
          expect(res.body).to.have.a.property('ownerName');
          expect(res.body).to.have.a.property('document');
          expect(res.body).to.have.a.property('coverageArea');
          expect(res.body).to.have.a.property('address');
          expect(res.body).to.have.a.property('created_at');
          expect(res.body).to.have.a.property('updated_at');
          done();
        });
    });

    it('should not found pdv', (done) => {
      chai.request(app)
        .get('/v1/pdvs/100')
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.a.property('error');
          expect(res.body).to.have.a.property('type');
          expect(res.body.type).to.be.equals('ResourceNotFound');
          expect(res.body).to.have.a.property('messages');
          expect(res.body.messages).to.be.a('array');
          done();
        });
    });
  });

  describe('/GET /pdvs/nearest/:lng/:lat', () => {
    it('should get a pdv', (done) => {
      chai.request(app)
        .get('/v1/pdvs/nearest/-43.27/-23')
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.a.property('_id');
          expect(res.body).to.have.a.property('id');
          expect(res.body).to.have.a.property('tradingName');
          expect(res.body).to.have.a.property('ownerName');
          expect(res.body).to.have.a.property('document');
          expect(res.body).to.have.a.property('coverageArea');
          expect(res.body).to.have.a.property('address');
          expect(res.body).to.have.a.property('distance');
          expect(res.body).to.have.a.property('created_at');
          expect(res.body).to.have.a.property('updated_at');
          done();
        });
    });

    it('should response with not covered area', (done) => {
      chai.request(app)
        .get('/v1/pdvs/nearest/43.27/-23')
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.a.property('error');
          expect(res.body).to.have.a.property('type');
          expect(res.body.type).to.be.equals('NotCoveredArea');
          expect(res.body).to.have.a.property('messages');
          expect(res.body.messages).to.be.a('array');
          done();
        });
    });
  });

  describe('/GET /health', () => {
    it('should respond with ok', (done) => {
      chai.request(app)
        .get('/health')
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  after((done) => {
    mongoose.disconnect().then(() => done());
  });
});
