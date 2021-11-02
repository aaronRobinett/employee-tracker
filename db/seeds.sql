INSERT INTO department (name)
VALUES
    ('departmentA'),
    ('departmentB'),
    ('departmentC'),
    ('departmentD'),
    ('departmentE');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Manager', 1000, 1),
    ('Assistant', 500, 1),
    ('Manager', 2000, 2),
    ('Assistant', 600, 2),
    ('Manager', 16000, 3),
    ('Assistant', 5600, 3),
    ('Manager', 10000, 4),
    ('Assistant', 5070, 4),
    ('Manager', 1020, 5),
    ('Assistant', 1100, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Aaron', 'Robinett', 1, 1),
    ('Todd', 'James', 2, 1),
    ('Patricia', 'Michael', 3, 1),
    ('Elizabeth', 'Richard', 4, 3),
    ('Nancy', 'Linda', 5, 1),
    ('Mark', 'Sandra', 6, 5),
    ('Donald', 'Ashley', 7, 1),
    ('Sarah', 'Kimberly', 8, 7),
    ('Christopher', 'Carolyn', 9, 1),
    ('Emma', 'Adam', 10, 9);

  