INSERT INTO students (name) VALUES ('Jena');
INSERT INTO students (name) VALUES ('Bob');
INSERT INTO students (name) VALUES ('Jessica');
INSERT INTO students (name) VALUES ('Steve');

INSERT INTO classes (name) VALUES ('Intro to Philosophy');
INSERT INTO classes (name) VALUES ('Intro to Music Theory');
INSERT INTO classes (name) VALUES ('Intro to C++');
INSERT INTO classes (name) VALUES ('Applied Behavioral Analysis');
INSERT INTO classes (name) VALUES ('Intro to Cognitive Psychology');

INSERT INTO students_classes (student_id, class_id) VALUES (1, 1);
INSERT INTO students_classes (student_id, class_id) VALUES (1, 4);
INSERT INTO students_classes (student_id, class_id) VALUES (1, 2);

INSERT INTO students_classes (student_id, class_id) VALUES (2, 1);
INSERT INTO students_classes (student_id, class_id) VALUES (2, 3);
INSERT INTO students_classes (student_id, class_id) VALUES (2, 2);

INSERT INTO students_classes (student_id, class_id) VALUES (3, 5);
INSERT INTO students_classes (student_id, class_id) VALUES (3, 3);
INSERT INTO students_classes (student_id, class_id) VALUES (3, 4);

INSERT INTO students_classes (student_id, class_id) VALUES (4, 2);
INSERT INTO students_classes (student_id, class_id) VALUES (4, 4);
INSERT INTO students_classes (student_id, class_id) VALUES (4, 5);


// view classes and associated students
SELECT 
	classes.name,
	array_agg(students.name)
FROM students_classes
JOIN students
ON students_classes.student_id = students.id
JOIN classes
ON students_classes.class_id = classes.id
GROUP BY classes.name


//view students and associated classes
SELECT 
	classes.name,
	array_agg(students.name)
FROM students_classes
JOIN students
ON students_classes.student_id = students.id
JOIN classes
ON students_classes.class_id = classes.id
GROUP BY classes.name