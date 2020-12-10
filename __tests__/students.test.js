const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Student = require('../lib/models/Student');

describe('students routes', () => {
  let student;
    
  beforeEach(async() => {

    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    student = await Student.insert({ name: 'Jena' });
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
    expect(response.body).toHaveLength(students.length + 1);
  });

  it ('returns a student by id', async() => {

    const response = await request(app)
      .get(`/students/${student.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(student);
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

    expect(response.body).toEqual({ ...newStudent, id: '2' });
  });

  it('updates a student by id', async() => {
    const updatedStudent = { name: 'Izzy' };

    const response = await request(app)
      .put(`/students/${student.id}`)
      .send(updatedStudent)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ ...updatedStudent, id: '1' });
  });
});
