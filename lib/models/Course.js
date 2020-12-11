const pool = require('../utils/pool');

module.exports = class Course {
    id;
    name;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
    }


    //FIND METHODS
    static async find() {
      const { rows } = await pool.query('SELECT * FROM courses');

      return rows.map(row => new Course(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
      SELECT * 
      FROM courses 
      WHERE id=$1
      `, [id]
      );
      
      if(!rows[0]) throw new Error(`No course with id ${id}.`);
      
      return new Course(rows[0]);
    }
  

    //INSERT METHOD
    static async insert({ name }) {
      const { rows } = await pool.query(`
      INSERT INTO courses(name)
      VALUES ($1)
      RETURNING *
      `, [name]
      );

      return new Course(rows[0]);
    }


    //UPDATE METHOD
    static async update(id, { name }) {
      const { rows } = await pool.query(`
      UPDATE courses
      SET name=$1
      WHERE id=$2
      RETURNING *
      `, [name, id]
      );

      if(!rows[0]) throw new Error('No course with id ${id}.');

      return new Course(rows[0]);
    }


    //DELETE METHOD
    static async delete(id) {
      const { rows } = await pool.query(`
      DELETE FROM courses
      WHERE id=$1
      RETURNING *
      `, [id]
      );

      return new Course(rows[0]);
    }
    
};
