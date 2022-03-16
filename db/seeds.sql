INSERT INTO department (id, name)
VALUES (001, "History"),
VALUES (002, "Social Sciences"),
VALUES (003, "Literature"),
VALUES (004, "Physics");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Professor", "60,000.00", 341),
VALUES (002, "Dean", "70,000.00", 342),
VALUES (003, "Librarian", "65,000.00", 343),
VALUES (004, "Admin", "50,000.00", 344);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Anna", "Karenina", 12, 123),
VALUES (002, "Kitty", "Shcherbatsky", 13, 124),
VALUES (003, "Alexei", "Karenin", 14, 125),
VALUES (004, "Konstantin", "Levin", 15, 126);
       
