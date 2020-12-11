const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Course = require('../lib/models/Course');

describe('courses routes', () => {
  let course;

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    course = await Course.insert({ name: 'Intro to Philosophy' });
  });

  afterAll(() => {
    return pool.end();
  });


  it('creates a new course', async() => {
    const newCourse = {
      name: 'Intro to Philosophy'
    };

    const response = await request(app)
      .post('/courses')
      .send(newCourse)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ ...newCourse, id: '2' });
  });
}); 
