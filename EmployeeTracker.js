const cTable = require('console.table');
class EmployeeTracker {
    constructor(db) {
        this.db = db;
    }

    // get all departments
    getAllDepts = function () {
        const sql = `SELECT * FROM department`;

        this.db.promise().query(sql)
            .then(rows => console.table(rows[0]))
            .catch(err => console.log(err));
    }

    // Create a department
    createDept = function (params) {
        const sql = `INSERT INTO department (name)
                VALUES (?)`;

        this.db.promise().query(sql, params)
            .then(() => console.log("\nDepartment Added!\n"))
            .catch(err => console.log(err));
    }

    // get all employees
    getAllemployees = function () {
        const sql = `SELECT employee.id, employee.first_name, 
        employee.last_name, roles.title AS title, 
        department.name AS department, roles.salary AS salary, 
        concat(temp.first_name, ' ', temp.last_name) AS manager
        FROM employee
        LEFT JOIN  roles
        ON employee.role_id = roles.id
        LEFT JOIN department
        ON roles.department_id = department.id
        LEFT JOIN employee AS temp
        ON employee.manager_id = temp.id`;

        this.db.promise().query(sql)
            .then(rows => console.table(rows[0]))
            .catch(err => console.log(err));
    }

    // create an employee
    createEmployee = function (params) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;

        this.db.promise().query(sql, params)
            .then(() => console.log("\nEmployee Added!\n"))
            .catch(err => console.log(err));
    }

    // Update an employee's role
    updateRole = function (params) {
        const sql = `UPDATE employee SET role_id = ? 
                 WHERE id = ?`;

        this.db.promise().query(sql, params)
            .then(() => console.log("\nEmployee Role Updated!\n"))
            .catch(err => console.log(err));
    }

    // get all roles
    getAllRoles = function () {
        const sql = `SELECT roles.title, roles.id, department.name AS department_name, roles.salary
                  FROM roles
                  LEFT JOIN department
                  ON roles.department_id = department.id`;

        this.db.promise().query(sql)
            .then(rows => console.table(rows[0]))
            .catch(err => console.log(err));
    }

    // Create a role
    createRole = function (params) {
        const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?,?,?)`;

        this.db.promise().query(sql, params)
            .then(() => console.log("\nRole Added!\n"))
            .catch(err => console.log(err));
    }
}



module.exports = EmployeeTracker;