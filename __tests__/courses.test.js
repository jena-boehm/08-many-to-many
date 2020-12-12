const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Course = require('../lib/models/Course');

describe('courses routes', () => {

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./SQL/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });


  it('returns all courses', async() => {
    const courses = await Promise.all([
      { name: 'Intro to Philosophy' },
      { name: 'Intro to C++' },
      { name: 'Applied Behavioral Analysis' }
    ].map(course => Course.insert(course)));

    const response = await request(app)
      .get('/courses');

    expect(response.body).toEqual(expect.arrayContaining(courses));
    expect(response.body).toHaveLength(courses.length);
  });
  
  it('returns a course by id', async() => {

    const course = await Course.insert({
      name: 'Intro to Music Theory',
    });

    const response = await request(app)
      .get(`/courses/${course.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(course);
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

    expect(response.body).toEqual({ ...newCourse, id: '1' });
  });

  it('updates a course by id', async() => {
    const course = await Course.insert({
      name: 'Intro to Philosophy'
    });

    const response = await request(app)
      .put(`/courses/${course.id}`)
      .send({ 
        name: 'Intro to Music Theory' 
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ 
      id: course.id,
      name: 'Intro to Music Theory' 
    });
  });

  it ('deletes a course by id', async() => {

    const course = await Course.insert({
      name: 'Intro to Philosophy'
    });

    const response = await request(app)
      .delete(`/courses/${course.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(course);
  });

}); 
