const express = require('express');
const Student = require('./models/Student');
const app = express();

app.use(express.json());

//endpoints

//GET
app.get('/students', (req, res, next) => {
  Student
    .find()
    .then(students => res.send(students))
    .catch(next);
});

app.get('/students/:id', (req, res, next) => {
  Student
    .findById(req.params.id)
    .then(student => res.send(student))
    .catch(next);
});


//POST 
app.post('/students', (req, res, next) => {
  Student
    .insert(req.body)
    .then(student => res.send(student))
    .catch(next);
});


//PUT
app.put('/students/:id', (req, res, next) => {
  Student
    .update(req.params.id, req.body)
    .then(student => res.send(student))
    .catch(next);
});

module.exports = app;
