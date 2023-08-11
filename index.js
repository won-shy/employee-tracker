// GIVEN a command-line application that accepts user input

const mysql = require('mysql2');
const inquirer = require('inquirer');
const util = require('util');
require("console.table");


// connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'employee_tracker_db'
    }
    // console.log('Connection to employee_tracker_db successful!')
);

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const startApp = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Please select from the following options:",
                name: "start",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "I'm done"
                ]
            }
        ])
        .then((response) => {
            // console.log('test string')
            console.log(response.start)
            switch (response.start) {
                case "View all departments": viewDeptartment();
                    break;
                case "View all roles": viewRoles();
                    break;
                case "View all employees": viewEmployees();
                    break;
                case "Add a department": addDeptartment();
                    break;
                case "Add a role": addRole();
                    break;
                case "Add an employee": addEmployee();
                    break;
                case "Update an employee role": updateRole();
                    break;
                case "I'm done":
                    console.log("Thank you!");
                    process.exit();
            }
        }).catch(err => console.log(err));
};


// call start app function
startApp();



// create variables for each case that user could pick
const viewDeptartment = () => {
    // console.log("test");
    // WHEN I choose to view all departments
    // THEN I am presented with a formatted table showing department names and department ids
    db.query(
        'SELECT * FROM department',
        function (err, results) {
            console.table(results); // results contains rows returned by server
            startApp();
        }
    );

};



const viewRoles = () => {
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    db.query(
        'SELECT * FROM roles',
        function (err, results) {
            console.table(results); // results contains rows returned by server
            startApp();
        }
    );
};

const viewEmployees = () => {
    // WHEN I choose to view all employees
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    db.query(
        'SELECT * FROM employees',
        function (err, results) {
            console.table(results); // results contains rows returned by server
            startApp();
        }
    );
};




async function addDeptartment() {
    // WHEN I choose to add a department
    // THEN I am prompted to enter the name of the department and that department is added to the database
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the department you would like to add?",
                name: "newDepartment"
            }
        ]).then(response => {
            db.query(
                "INSERT INTO department SET ?",
                { name: response.newDepartment }, function
                (err, results) {
                if (err) {
                    console.log(err)
                } else {
                    db.query('SELECT * FROM department', (err, results) => {
                        err ? console.log(err) : console.table(results);
                        startApp();
                    })
                }
            })
        })

};



async function addRole() {
    // WHEN I choose to add a role
    // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    const departmentChoices = () => db.promise().query('SELECT * FROM department').then((rows) => {
        let depArr = rows[0].map(obj => obj.name);
        return depArr
    })

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the role you would like to add?",
                name: "newRoleName"
            },
            {
                type: "input",
                message: "What is the salary for this new role?",
                name: "newRoleSalary"
            },
            {
                type: "list",
                message: "Which department is this role in?",
                name: "newRoleDep",
                choices: departmentChoices
            }
        ]).then(response => {
            db.query("INSERT INTO roles SET ?", { title: response.newRoleName, department: response.newRoleDep, salary: response.newRoleSalary })
        })
        .then(data => {
            db.query('SELECT * FROM roles',
                function (err, results) {
                    console.table(results); // results contains rows returned by server
                    startApp();
                    console.log(data);

                })
        }
        )
};



const addEmployee = () => {
    // WHEN I choose to add an employee
    // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    const query = 'SELECT * FROM employees';
    db.query(query, ["NULL"], (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return;
        }
        const roleChoices = results.map((row) => row.title);
        // console.log(roleChoices);
        const managerChoices = results.map((row) => row.manager);
        // console.log(managerChoices);
        const departmentChoices = results.map((row) => row.department);

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "newFirstName"
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "newLastName"
                },
                {
                    type: "list",
                    message: "What is the new employee's role?",
                    name: "newEmployeeRole",
                    choices: roleChoices
                },
                {
                    type: "list",
                    message: "Which department is the employee in?",
                    name: "newEmployeeDepartment",
                    choices: departmentChoices
                },
                {
                    type: "input",
                    message: "What is this employee's salary?",
                    name: "newEmployeeSalary"
                },
                {
                    type: "list",
                    message: "Who is the new employee's manager?",
                    name: "newEmployeeManager",
                    choices: managerChoices
                }
            ]).then(response => {
                db.query("INSERT INTO employees SET ?", { first_name: response.newFirstName, last_name: response.newLastName, title: response.newEmployeeRole, department: response.newEmployeeDepartment, salary: response.newEmployeeSalary, manager: response.newEmployeeManager })
            })
            .then(data => {
                db.query('SELECT * FROM employees',
                    function (err, results) {
                        console.table(results); // results contains rows returned by server
                        startApp();
                        console.log(data);

                    })
            }
            )

    })
};



const updateRole = () => {
    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    db.query('SELECT * FROM employees', (error, results) => {
        if (error) {
            console.error('Error fetching employees:', error);
            return;
        }
        // code to prepare employee choices
        const employeeChoices = results.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Select the employee whose role you would like to update:",
                    choices: employeeChoices
                },
                {
                    type: "input",
                    name: "newRole",
                    message: "Enter the new role:"
                },
            ]).then((answers) => {
                const { employeeId, newRole } = answers;

                // const query = "UPDATE employees SET title = ? WHERE employee_id = ?";

                db.query("UPDATE employees SET title = ? WHERE id = ?", [newRole, employeeId], (error, results) => {
                    if (error) {
                        console.error("Error updating role:", error);
                        return;
                    }
                    console.log('Role updated successfully!');
                })

            }).then(data => {
                db.query('SELECT * FROM employees', (err, results) => {
                    console.table(results); // results contains rows returned by server
                    startApp();
                    console.log(data);

                })

            })
    })

};