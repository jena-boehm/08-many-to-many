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
      SELECT * FROM students
      WHERE id=$1`,
      [id]
      );
      
      if(!rows[0]) throw new Error(`No student with id ${id}.`);
      
      return new Student(rows[0]);
    }

    //INSERT METHOD
    static async insert({ name }) {
      const { rows } = await pool.query(`
        INSERT INTO students (name) 
        VALUES ($1)
        RETURNING *
        `, [name]
      );

      return new Student(rows[0]);
    }
};
