const pool = require('../utils/pool');

module.exports = class Course {
    id;
    name;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
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
    
};
