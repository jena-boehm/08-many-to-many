const pool = require('../utils/pool');

module.exports = class Student {
    id;
    name;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
    }

    //FIND METHODS
    static async find() {
      const { rows } = await pool.query('SELECT * FROM students');

      return rows.map(row => new Student(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
      SELECT 
        students.*,
        array_agg(courses.name) AS courses
      FROM students_courses
      JOIN students
      ON students_courses.student_id = students.id
      JOIN courses
      ON students_courses.course_id = courses.id
      WHERE students.id=$1
      GROUP BY students.id
      `, [id]
      );
      
      if(!rows[0]) throw new Error(`No student with id ${id}.`);
      console.log(rows[0]);
      
      return { 
        ...new Student(rows[0]),
        courses: rows[0].courses 
      };
    }

    //INSERT METHOD
    static async insert({ name, courses = [] }) {
      const { rows } = await pool.query(`
        INSERT INTO students (name) 
        VALUES ($1)
        RETURNING *
        `, [name]
      );

      await pool.query(`
      INSERT INTO students_courses (student_id, course_id)
      SELECT ${rows[0].id}, id 
      FROM courses
      WHERE name = ANY($1::name[])
      `, [courses]
      );

      return new Student(rows[0]);
    }

    //UPDATE METHOD
    static async update(id, { name }) {
      const { rows } = await pool.query(`
      UPDATE students
      SET name=$1
      WHERE id=$2
      RETURNING *
      `, [name, id]
      );

      if(!rows[0]) throw new Error('No student with id ${id}.');

      return new Student(rows[0]);
    }

    //DELETE METHOD
    static async delete(id) {
      const { rows } = await pool.query(`
      DELETE FROM students
      WHERE id=$1
      RETURNING *
      `, [id]
      );

      return new Student(rows[0]);
    }
};
