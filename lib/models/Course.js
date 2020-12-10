module.exports = class Course {
    id;
    name;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
    }

    
};
