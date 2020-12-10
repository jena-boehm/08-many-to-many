INSERT INTO students (name) VALUES ('Jena');
INSERT INTO students (name) VALUES ('Bob');
INSERT INTO students (name) VALUES ('Jessica');
INSERT INTO students (name) VALUES ('Steve');

INSERT INTO courses (name) VALUES ('Intro to Philosophy');
INSERT INTO courses (name) VALUES ('Intro to Music Theory');
INSERT INTO courses (name) VALUES ('Intro to C++');
INSERT INTO courses (name) VALUES ('Applied Behavioral Analysis');
INSERT INTO courses (name) VALUES ('Intro to Cognitive Psychology');

INSERT INTO students_courses (student_id, course_id) VALUES (1, 1);
INSERT INTO students_courses (student_id, course_id) VALUES (1, 4);
INSERT INTO students_courses (student_id, course_id) VALUES (1, 2);

INSERT INTO students_courses (student_id, course_id) VALUES (2, 1);
INSERT INTO students_courses (student_id, course_id) VALUES (2, 3);
INSERT INTO students_courses (student_id, course_id) VALUES (2, 2);

INSERT INTO students_courses (student_id, course_id) VALUES (3, 5);
INSERT INTO students_courses (student_id, course_id) VALUES (3, 3);
INSERT INTO students_courses (student_id, course_id) VALUES (3, 4);

INSERT INTO students_courses (student_id, course_id) VALUES (4, 2);
INSERT INTO students_courses (student_id, course_id) VALUES (4, 4);
INSERT INTO students_courses (student_id, course_id) VALUES (4, 5);


// view courses and associated students
SELECT 
	courses.name,
	array_agg(students.name)
FROM students_courses
JOIN students
ON students_courses.student_id = students.id
JOIN courses
ON students_courses.course_id = courses.id
GROUP BY courses.name


//view students and associated courses
SELECT 
	courses.name,
	array_agg(students.name)
FROM students_courses
JOIN students
ON students_courses.student_id = students.id
JOIN courses
ON students_courses.course_id = courses.id
GROUP BY courses.name