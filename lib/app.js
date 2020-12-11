const express = require('express');
const Course = require('./models/Course');
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

app.get('/courses', (req, res, next) => {
  Course
    .find()
    .then(courses => res.send(courses))
    .catch(next);
});

app.get('/students/:id', (req, res, next) => {
  Student
    .findById(req.params.id)
    .then(student => res.send(student))
    .catch(next);
});

app.get('/courses/:id', (req, res, next) => {
  Course
    .findById(req.params.id)
    .then(course => res.send(course))
    .catch(next);
});


//POST 
app.post('/students', (req, res, next) => {
  Student
    .insert(req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.post('/courses', (req, res, next) => {
  Course
    .insert(req.body)
    .then(course => res.send(course))
    .catch(next);
});


//PUT
app.put('/students/:id', (req, res, next) => {
  Student
    .update(req.params.id, req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.put('/courses/:id', (req, res, next) => {
  Course
    .update(req.params.id, req.body)
    .then(course => res.send(course))
    .catch(next);
});


//DELETE
app.delete('/students/:id', (req, res, next) => {
  Student
    .delete(req.params.id)
    .then(student => res.send(student))
    .catch(next);
});

app.delete('/courses/:id', (req, res, next) => {
  Course
    .delete(req.params.id)
    .then(course => res.send(course))
    .catch(next);
});



module.exports = app;
