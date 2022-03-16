// const express = require("express");
const path = require("path");
const inquirer = require("inquirer");
//below brings in only prompt method
// const {prompt} = require("inquirer");
// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
const fs = require("fs");
const cTable = require("console.table");
const mysql = require("mysql2");
require("./server.js");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

const addDeptQuestions = [
  {
    type: "input",
    message: "Name of new database:",
    name: "newDB",
  },
];
const addRoleQuestions = [
  {
    type: "input",
    message: "Name of new role:",
    name: "newRoleName",
  },
  {
    type: "input",
    message: "Salary of new role:",
    name: "newRoleSal",
  },
  {
    type: "input",
    message: "Department for new role:",
    name: "newRoleDept",
  },
];
const addEmpQuestions = [
  {
    type: "input",
    message: "First name of new employee:",
    name: "newEmpFirst",
  },
  {
    type: "input",
    message: "Last name of new employee:",
    name: "newEmpLast",
  },
  {
    type: "input",
    message: "Role of new employee:",
    name: "newEmpRole",
  },
  {
    type: "input",
    message: "Manager of new employee:",
    name: "newEmpMgmt",
  },
];
const updateEmpQuestions = [
  {
    type: "list",
    message: "Choose employee to update:",
    name: "updateEmpChoice",
    choices: [],
  },
];

const appQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "purpose",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
    validate(answer) {
      if (answer === "View all departments") {
        viewDept();
      } else if (answer === "View all roles") {
        viewRoles();
      } else if (answer === "View all employees") {
        viewEmps();
      } else if (answer === "Add a department") {
        addDept();
      } else if (answer === "Add a role") {
        addRole();
      } else if (answer === "Add an employee") {
        addEmp();
      } else {
        updateEmp();
      }
    },
  },
];

function viewDept() {
  //   console.log("viewDept() invoked");
  //Query the department table
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
  init();
}
function viewRoles() {
  //   console.log("viewRoles() invoked");
  //Query the role table
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
  init();
}
function viewEmps() {
  //   console.log("viewEmps() invoked");
  //Query the employees table
  db.query("SELECT * FROM employees", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
  init();
}
function addDept() {
  console.log("addDept() invoked");
  init();
}
function addRole() {
  console.log("addRole() invoked");
  init();
}
function addEmp() {
  console.log("addEmp() invoked");
  init();
}
function updateEmp() {
  console.log("updateEmp() invoked");
  init();
}

// function addEmployeeOLD() {
//   inquirer
//     .prompt({
//       message: "What do you want to do?",
//       type: "list",
//       name: "choice",
//       choices: ["Add employee", "Create roster"],
//     })
//     .then((data) => {
//       console.log("YOUR Choice --- ", data.choice);
//       if (data.choice === "Add employee") {
//         inquirer.prompt(employeePrompt).then((data) => {
//           console.log("answers for employee --- ", data);
//           if (data.role === "Engineer") {
//             const emp = new Engineer(
//               data.name,
//               data.id,
//               data.email,
//               data.extra
//             );
//             employees.push(emp);
//           } else {
//             const emp = new Intern(data.name, data.id, data.email, data.extra);
//             employees.push(emp);
//           }

//           console.log(`${data.role} added to Team!`);
//           setTimeout(addEmployee, 2000);
//         });
//       } else {
//         createHTML();
//       }
//     });
// }

// function createHTML() {
//   console.log("Creating HTML...");
//   console.log("All Employees ---- ", employees);

//   const html = `<!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <meta http-equiv="X-UA-Compatible" content="IE=edge" />
// <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// <link
// href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
// rel="stylesheet"
// integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
// crossorigin="anonymous"
// />
// <link rel="stylesheet" href="" />
// <style>
// .card {
// box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
// rgba(0, 0, 0, 0.22) 0px 10px 10px;
// }
// </style>
// <title>Team Profile</title>
// </head>
// <body>
// <nav class="navbar navbar-light bg-danger bg-gradient">
// <div class="container-fluid">
// <h1 class="navbar-brand my-4 mx-auto fs-2 text-white">My Team</h1>
// </div>
// </nav>
// <div class="row p-5">
// ${employees
//   .map((employee) =>
//     employee.generateHTMLCard(
//       employee.officeNum || employee.github || employee.school
//     )
//   )
//   .join("\n")}
// </div>
// </body>
// </html>`;
//   fs.writeFile("./dist/output.html", html, (err) =>
//     err
//       ? console.error(err)
//       : console.log("Team Profile page has been written!")
//   );
// }

// function init() {
//   inquirer.prompt(questionsMgmt).then((response) => {
//     console.log(response);
//     // console.log(response.json());
//     //create new manager using info from prompt
//     const manager = new Manager(
//       response.name,
//       response.id,
//       response.email,
//       response.officeNum
//     );
//     employees.push(manager);
//     //invoke functin to create new employees
//     addEmployee();
//   });
// }
function init() {
  inquirer.prompt(appQuestions).then((response) => {
    console.log(response);
    if (response.purpose === "View all departments") {
      viewDept();
    } else if (response.purpose === "View all roles") {
      viewRoles();
    } else if (response.purpose === "View all employees") {
      viewEmps();
    } else if (response.purpose === "Add a department") {
      addDept();
    } else if (response.purpose === "Add a role") {
      addRole();
    } else if (response.purpose === "Add an employee") {
      addEmp();
    } else {
      updateEmp();
    }
    // console.log(response.json());
    //create new manager using info from prompt
    // const manager = new Manager(
    //   response.name,
    //   response.id,
    //   response.email,
    //   response.officeNum
    // );
    // employees.push(manager);
    // //invoke functin to create new employees
    // addEmployee();
  });
}
init();
