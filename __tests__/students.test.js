const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Student = require('../lib/models/Student');
const Course = require('../lib/models/Course');

describe('students routes', () => {
    
  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });


  it('returns all students', async() => {
    const students = await Promise.all([
      { name: 'Bob' },
      { name: 'Steve' },
      { name: 'Jessica' }
    ].map(student => Student.insert(student)));

    const response = await request(app)
      .get('/students');

    expect(response.body).toEqual(expect.arrayContaining(students));
    expect(response.body).toHaveLength(students.length);
  });


  it('returns a student by id', async() => {
    await Promise.all([
      { name: 'Intro to Music Theory' },
      { name: 'Intro to C++' },
      { name: 'Intro to Philosophy' }
    ].map(course => Course.insert(course)));

    const student = await Student.insert({
      name: 'Jena',
      courses: ['Intro to Philosophy', 'Intro to C++']
    });

    const response = await request(app)
      .get(`/students/${student.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ 
      ...student, 
      courses: expect.arrayContaining(['Intro to Philosophy', 'Intro to C++'] 
      ) });
  });


  it('creates a new student', async() => {
    const newStudent = {
      name: 'Jena'
    };

    const response = await request(app)
      .post('/students')
      .send(newStudent)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ ...newStudent, id: '1' });
  });


  it('updates a student by id', async() => {
    const student = await Student.insert({
      name: 'Jena'
    });

    const response = await request(app)
      .put(`/students/${student.id}`)
      .send({ 
        name: 'Izzy' 
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ 
      id: student.id,
      name: 'Izzy' 
    });
  });

  
  it ('deletes a student by id', async() => {

    const student = await Student.insert({
      name: 'Jena'
    });

    const response = await request(app)
      .delete(`/students/${student.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(student);
  });
});
