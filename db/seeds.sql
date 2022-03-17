INSERT INTO department (id, name)
VALUES (001, "History"),
(002, "Social Sciences"),
(003, "Literature"),
(004, "Admin");

INSERT INTO role (id, title, salary, department_id)
VALUES (101, "Professor", "60000.00",001),
(201, "Dean", "70000.00",002),
(301, "Librarian", "65000.00",003),
(401, "Student Success", "50000.00", 004);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (080, "Anna", "Karenina",101,030),
(081, "Kitty", "Shcherbatsky",201,031),
(082, "Alexei", "Karenin",301,032),
(083, "Konstantin", "Levin",401,033);