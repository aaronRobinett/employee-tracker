const cTable = require('console.table');
const inquirer = require('inquirer');
class EmployeeTracker {
    constructor(db) {
        this.db = db;
    }

    // get all departments
    getAllDepts = function () {
        const sql = `SELECT * FROM department`;

        this.db.promise().query(sql)
            .then(rows => {
                console.table(rows[0]);
            })
            .then(res => this.getMenuChoices())
            .catch(err => console.log(err));
    }

    // Create a department
    createDept = function () {
        const params = [];
        inquirer.prompt(
            [{
                type: 'input',
                message: 'What is the name of the department you would like to add?',
                name: 'deptName',
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log('Please enter a name for your department!');
                        return false;
                    }
                }
            }
            ])
            .then(userResponse => {
                params.push(userResponse.deptName);

            }).then(result => {
                const sql = `INSERT INTO department (name)
                VALUES (?)`;

                this.db.promise().query(sql, params)
                    .then(() => console.log("\nDepartment Added!\n"))
                    .then(res => this.getMenuChoices())
                    .catch(err => console.log(err));
            })

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
            .then(res => this.getMenuChoices())
            .catch(err => console.log(err));
    }

    // create an employee
    createEmployee = function (params) {

        //const params = [];
        this.db.promise().query(`SELECT id, name FROM roles`)
            .then(rows => {
                let roleList = [];
                roleList.push(rows[0]);
                let roleChoiceList = roleList[0].map(role => {
                    return role.name;
                });
                return [roleChoiceList];
            }).then(userChoices => {
                inquirer.prompt(
                    [{
                        type: 'input',
                        message: 'What is the first name of the employee you would like to add?',
                        name: 'firstName',
                        validate: userInput => {
                            if (userInput) {
                                return true;
                            } else {
                                console.log('Please enter a name for your employee!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        message: 'What is the last name of the employee you would like to add?',
                        name: 'lastName',
                        validate: userInput => {
                            if (userInput) {
                                return true;
                            } else {
                                console.log('Please enter a name for your employee!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        message: "What is this employee's job title?",
                        name: 'role',
                        choices: userChoices[0]
                    }
                    ])
                    .then((userResponse) => {
                        this.db.promise().query(`SELECT id FROM roles WHERE name = ?`, userResponse.role)
                            .then(rows => {
                                let role_id = rows[0][0].id;
                                return role_id;
                            }).then(department_id => {
                                params.push(userResponse.roleName);
                                params.push(userResponse.salary);
                                params.push(department_id);
                            }).then(() => {
                                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                                 VALUES (?,?,?,?)`;

                                this.db.promise().query(sql, params)
                                    .then(() => console.log("\nEmployee Added!\n"))
                                    .then(res => this.getMenuChoices())
                            })
                    })
            }).catch(err => console.log(err))



    }

    // Update an employee's role
    updateRole = function (params) {
        const sql = `UPDATE employee SET role_id = ? 
                 WHERE id = ?`;

        this.db.promise().query(sql, params)
            .then(() => console.log("\nEmployee Role Updated!\n"))
            .then(res => this.getMenuChoices())
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
            .then(res => this.getMenuChoices())
            .catch(err => console.log(err));
    }

    // Create a role
    createRole = function () {
        const params = [];
        this.db.promise().query(`SELECT id, name FROM department`)
            .then(rows => {
                let deptList = [];
                deptList.push(rows[0]);
                let choiceList = deptList[0].map(dept => {
                    return dept.name;
                });
                return choiceList;
            }).then(choiceList => {
                inquirer.prompt(
                    [{
                        type: 'input',
                        message: 'What is the name of the role you would like to add?',
                        name: 'roleName',
                        validate: userInput => {
                            if (userInput) {
                                return true;
                            } else {
                                console.log('Please enter a name for your role!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'number',
                        message: 'What is the salary for the role you would like to add?',
                        name: 'salary'
                    },
                    {
                        type: 'list',
                        message: 'What department does this role belong to?',
                        name: 'department',
                        choices: choiceList
                    }
                    ])
                    .then((userResponse) => {
                        this.db.promise().query(`SELECT id FROM department WHERE name = ?`, userResponse.department)
                            .then(rows => {
                                let dept_id = rows[0][0].id;
                                return dept_id;
                            }).then(department_id => {
                                params.push(userResponse.roleName);
                                params.push(userResponse.salary);
                                params.push(department_id);
                            }).then(() => {
                                const sql = `INSERT INTO roles (title, salary, department_id)
                                VALUES (?,?,?)`;

                                this.db.promise().query(sql, params)
                                    .then(() => console.log("\nRole Added!\n"))
                                    .then(res => this.getMenuChoices())
                            })
                    })
            }).catch(err => console.log(err))
    }

    // menu
    getMenuChoices = function () {
        inquirer.prompt(
            [{
                type: 'list',
                message: 'What would you like to do?',
                name: 'menuChoice',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'quit']
            }
            ])
            .then(result => {
                if (result.menuChoice === 'View all departments') {
                    this.getAllDepts();
                }
                if (result.menuChoice === 'View all roles') {
                    this.getAllRoles();
                }
                if (result.menuChoice === 'View all employees') {
                    this.getAllemployees();
                }
                if (result.menuChoice === 'Add a department') {
                    this.createDept();
                }
                if (result.menuChoice === 'Add a role') {
                    this.createRole();
                }
                if (result.menuChoice === 'Add an employee') {
                    this.createEmployee();
                }
            })
    }
}



module.exports = EmployeeTracker;