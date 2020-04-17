const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const managerArray = [];
const engineerArray = [];
const internArray = [];

function buildTeam() {

  return inquirer.prompt([
    {
      type: "question",
      message: "what is your manager's name?",
      name: "name"
    },
    {
      type: "question",
      message: "what is your manager's Id?",
      name: "id",
    },
    {
      type: "question",
      message: "what is your manager's email?",
      name: "email",
    },
    {
      type: "question",
      message: "what is your manager's office number?",
      name: "officeNumber",
    }
  ])
  .then(function(data) {
    const manager = new Manager (
      data.name,
      data.id,
      data.email,
      data.officeNumber,
    );
    managerArray.push(manager);
  })
  .then(function() {
    getEngineers()
  });
};

function getEngineers() {
  return inquirer.prompt([
    {
      type: "question",
      message: "what is your engineer's name?",
      name: "name"
    },
    {
      type: "question",
      message: "what is your engineer's Id?",
      name: "id",
    },
    {
      type: "question",
      message: "what is your engineer's email?",
      name: "email",
    },
    {
      type: "question",
      message: "what is your engineer's GitHub username:",
      name: "github",
    }
  ])
  .then(function(data) {
    const engineer = new Engineer (
      data.name,
      data.id,
      data.email,
      data.github,
    );
    engineerArray.push(engineer);
  })
  .then(function() {
    inquirer.prompt([
      {
        type: "list",
        message: "Do you want to add another engineer?",
        choices: ["Yes", "No"],
        name: "continue"
      }
    ]).then(function(data) {
      if (data.continue === "Yes") {
        getEngineers();
      } else {
        inquirer.prompt([
          {
            type: "list",
            message: "would you like to add an intern?",
            choices: ["Yes", "No"],
            name: "continue"
          }
        ]).then(function(data) {
          if (data.continue === "Yes") {
            getInterns();
          } else {
            return generateHtml();
          };
        });
      };
    });
  });
};

function getInterns() {
  return inquirer.prompt([
    {
      type: "question",
      message: "what is your intern's name?",
      name: "name"
    },
    {
      type: "question",
      message: "what is your interns Id?",
      name: "id",
    },
    {
      type: "question",
      message: "what is your intern's email?",
      name: "email",
    },
    {
      type: "question",
      message: "where did your intern go to school?",
      name: "school",
    }
  ])
  .then(function(data) {
    const intern = new Intern (
      data.name,
      data.id,
      data.email,
      data.school,
    );
    internArray.push(intern);
  })
  .then(function() {
    inquirer.prompt([
      {
        type: "list",
        message: "Do you want to add another intern?",
        choices: ["Yes", "No"],
        name: "continue"
      }
    ]).then(function(data) {
      if (data.continue === "Yes") {
        getInterns();
      } else {
        return generateHtml();
      };
    });
  });
};

function generateHtml() {

  const engineerLoop = function() {
    for(let i = 0; i<engineerArray.length; i++) {
      appendFileAsync('./output/index.html', 
      `<div class="card" style="width: 18rem;">
      <div class="card-header text-center text-white bg-warning mb-3">
        Engineer: ${engineerArray[i].name}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${engineerArray[i].id} </li>
        <li class="list-group-item">Email: ${engineerArray[i].email} </li>
        <li class="list-group-item">Github: ${engineerArray[i].github} </li>
      </ul>
    </div>`);
      };
    };

  const internLoop = function() {
    for(let i = 0; i<internArray.length; i++) {
      appendFileAsync('./output/index.html', 
      `<div class="card" style="width: 18rem;">
      <div class="card-header text-center text-white bg-success mb-3">
        Intern: ${internArray[i].name}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${internArray[i].id} </li>
        <li class="list-group-item">Email: ${internArray[i].email} </li>
        <li class="list-group-item">School: ${internArray[i].school} </li>
      </ul>
    </div>`);
      };
    };

  writeFileAsync('./output/index.html', 
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Summary</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
</head>

<body>
    <div class="jumbotron jumbotron-fluid text-center text-white bg-dark mb-3">
        <div class="container">
          <h1 class="display-4">The Team</h1>
        </div>
      </div>`
    )
    .then(function() {
      appendFileAsync('./output/index.html', 
        `<div class="card-deck">
      <div class="card" style="width: 18rem;">
        <div class="card-header text-center text-white bg-info mb-3">
          Manager: ${managerArray[0].name}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Id: ${managerArray[0].id}</li>
          <li class="list-group-item">Email: ${managerArray[0].email}</li>
          <li class="list-group-item">Office Number: ${managerArray[0].officeNumber}</li>
        </ul>
        </div>`
      )
      .then(function() {
        engineerLoop();
          }
        ).then(function() {
            internLoop();
            }
          ).then(function() {
            appendFileAsync('./output/index.html', 
            `</div>
              </div>
              </div>
              <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
              </body>
              </html>`
            );
          }); 
    });    
};

buildTeam();