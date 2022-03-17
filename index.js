const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
require("./server.js");
const figlet = require("figlet");

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

// starter data storage variables
const empArr = [];

//QUESTIONS
const addDeptQuestions = [
  {
    type: "input",
    message: "Name of new department:",
    name: "newDept",
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
    message:
      "Department ID for new role:\n'001' = History\n'002' = Social Sciences\n'003' = Literature\n'004' = Admin\n",
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
    message:
      "Role of new employee:\n'101' = Professor\n'201' = Dean\n'301' = Librarian\n'401' = Student Success\n",
    name: "newEmpRole",
  },
  {
    type: "input",
    message:
      "Manager of new employee:\n'030' = Knyagina Betsy\n'031' = Countess Vronsky\n'032' = Countess Lidia Ivanovna\n'033' = Nikolai Dmitrievich Levin\n",
    name: "newEmpMgmt",
  },
];

const updateEmpQuestions = [
  {
    type: "list",
    message: "Choose employee to update:",
    name: "updateEmpChoice",
    choices: empArr,
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
      "Quit application",
    ],
    // validate(answer) {
    //   if (answer === "View all departments") {
    //     viewDept();
    //   } else if (answer === "View all roles") {
    //     viewRoles();
    //   } else if (answer === "View all employees") {
    //     viewEmps();
    //   } else if (answer === "Add a department") {
    //     addDept();
    //   } else if (answer === "Add a role") {
    //     addRole();
    //   } else if (answer === "Add an employee") {
    //     addEmp();
    //   } else {
    //     updateEmp();
    //   }
    // },
  },
];

//rendering current employee list
function empArrRender() {
  //  promise method attempt 2
  //  db.promise()
  //     .query("SELECT first_name, last_name FROM employees")
  //     .then((results) => {
  //       //   console.log(results);
  //       const resArr = results[0];
  //       //   console.log(resArr);
  //       return Promise.all(
  //         resArr.map(function (name) {
  //           return empArr.push(name);
  //         })
  //       );
  //     })
  //     .catch(console.log)
  //     .then(() => db.end());
  //   //.promise() method attempt 1
  //   db.promise()
  //     .query("SELECT first_name, last_name FROM employees")
  //     .then((results) => {
  //       //   console.log(results);
  //       const resArr = results[0];
  //       //   console.log(resArr);
  //       resArr.forEach((result) => {
  //         // console.log("entering loop");
  //         // console.log(result);
  //         const first_name = result.first_name;
  //         const last_name = result.last_name;
  //         const emp = `${first_name} ${last_name}`;
  //         console.log(emp);
  //         empArr.push(emp);
  //         console.log(empArr);
  //       });
  //     })
  //     .catch(console.log)
  //     .then(() => db.end());
  // PROMISE OBJECT ATTEMPT
  //   return new Promise(function (resolve, reject) {
  //     db.query(
  //       "SELECT first_name, last_name FROM employees",
  //       function (err, results) {
  //         if (results === undefined) {
  //           reject(new Error("Error - rows is undefined"));
  //         } else {
  //           //   resolve(results);
  //           resolve(
  //             results.forEach((results) => {
  //               const first_name = results.first_name;
  //               const last_name = results.last_name;
  //               const emp = first_name + " " + last_name;
  //               empArr.push(emp);
  //             })
  //           );
  //         }
  //       }
  //     );
  //--FOR EACH ATTEMPT--
  // results.forEach((results) => {
  //   console.log("entering loop");
  //   const first_name = results.first_name;
  //   const last_name = results.last_name;
  //   const emp = first_name + " " + last_name;
  //   empArr.push(emp);
  // });
  //--FOR LOOP ATTEMPT--
  //   for (let i = 0; i < results.length; i++) {
  // const first_name = results.first_name;
  //   const last_name = results.last_name;
  //   const emp = first_name + " " + last_name;
  //     // const element = `${results[i].first_name} ${results[i].last_name}`;
  //     console.log("entering loop");
  //     console.log(element);
  //     empArr.push(element);
  //     console.log(empArr);
  //   }
  //   console.log("EMPARRAY -----", empArr);
  //   });
}

//SQL QUERY FUNCTIONS
function viewDept() {
  //   console.log("viewDept() invoked");
  //Query the department table
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(cTable.getTable(results));
  });
  setTimeout(init, 3000);
}

function viewRoles() {
  //   console.log("viewRoles() invoked");
  //Query the role table
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(cTable.getTable(results));
  });
  setTimeout(init, 3000);
}

function viewEmps() {
  //   console.log("viewEmps() invoked");
  //Query the employees table
  db.query("SELECT * FROM employees", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(cTable.getTable(results));
  });
  setTimeout(init, 3000);
}

function addDept() {
  console.log("addDept() invoked");
  inquirer.prompt(addDeptQuestions).then((response) => {
    console.log(response.newDept);
    const newDept = response.newDept;
    db.query(
      `INSERT INTO department(name) VALUES(${newDept})`,
      function (err, results) {
        if (err) {
          console.log(err);
        }
        // console.log(results);
        console.log(`Added ${newDept} to the database`);
        setTimeout(init, 3000);
      }
    );
  });
}

function addRole() {
  console.log("addRole() invoked");
  inquirer.prompt(addRoleQuestions).then((response) => {
    // console.log(response);
    const newRoleName = response.newRoleName;
    const newRoleSal = response.newRoleSal;
    const newRoleDept = response.newRoleDept;
    db.query(
      `INSERT INTO role (title, salary, department_id) VALUES("${newRoleName}",${newRoleSal},${newRoleDept})`,
      function (err, results) {
        if (err) {
          console.log(err);
        }
        // console.log(results);
        console.log(`Added ${newRoleName} to the database`);
        setTimeout(init, 3000);
      }
    );
  });
}

function addEmp() {
  console.log("addEmp() invoked");
  inquirer.prompt(addEmpQuestions).then((response) => {
    // console.log(response);
    const newEmpFirst = response.newEmpFirst;
    const newEmpLast = response.newEmpLast;
    const newEmpRole = response.newEmpRole;
    const newEmpMgmt = response.newEmpMgmt;
    db.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("${newEmpFirst}","${newEmpLast}",${newEmpRole},${newEmpMgmt})`,
      function (err, results) {
        if (err) {
          console.log(err);
        }
        // console.log(results);
        console.log(`Added ${newEmpFirst} ${newEmpLast} to the database`);
        setTimeout(init, 3000);
      }
    );
  });
}

function updateEmp() {
  console.log("updateEmp() invoked");
  //   empArrRender().then(function (results) {
  //     console.log(results);
  //   });
  empArrRender();
  //   console.log(empArrRender());
  console.log(empArr);
  inquirer.prompt(updateEmpQuestions).then((response) => {
    console.log(response);
    // const updateEmpChoice = response.updateEmpChoice;
    // db.query(
    //   `UPDATE employees SET (first_name, last_name, role_id, manager_id) VALUES("${newEmpFirst}","${newEmpLast}",${newEmpRole},${newEmpMgmt})`,
    //   function (err, results) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     // console.log(results);
    //     console.log(`Added ${newEmpFirst} ${newEmpLast} to the database`);
    //     setTimeout(init, 3000);
    //   }
    // );
  });
}

function init() {
  //render intro banner
  console.log(
    figlet.textSync("Employee Tracker", {
      font: "cyberlarge",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  //render start questions
  inquirer.prompt(appQuestions).then((response) => {
    // console.log(response);
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
    } else if (response.purpose === "Update an employee role") {
      updateEmp();
    } else {
      process.exit();
    }
  });
}
init();
