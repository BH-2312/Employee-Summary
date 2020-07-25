const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Questions to ask the manager about their employment//

const managerQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",

  },
  {
    type: "input",
    message: "What is your id?",
    name: "id",

  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",

  },
  {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber",

  }

];

//Questions to ask the manager regarding the intern//

const internQuestions = [
  
  {
    type: "input",
    message: "What is the intern's name?",
    name: "name",

  },
  {
    type: "input",
    message: "What is the intern's id?",
    name: "id",

  },
  {
    type: "input",
    message: "What is the intern's email?",
    name: "email",

  },
  {
    type: "input",
    message: "What school did the intern attend?",
    name: "school",

  }
];

//Questions to ask the manager regarding the engineer//

const engineerQuestions = [
 
  {
    type: "input",
    message: "What is the engineer's name?",
    name: "name",

  },
  {
    type: "input",
    message: "What is the engineer's id?",
    name: "id",

  },
  {
    type: "input",
    message: "What is the engineer's email?",
    name: "email",

  },
  {
    type: "input",
    message: "What is the engineer's github?",
    name: "github",

  },
];

//Question to ask the manager regarding the type of employee they are asking//

const teamQuestion = {
  type: "list",
  message: "What sort of employee are you adding?",
  name: "job",
  choices: [
    "Engineer",
    "Intern",
    "No more employees"
  ]
};

//Array to hold employees as they are added//

var employees = [];

//function to prompt the manager with questions//

function init() {
  inquirer.prompt(managerQuestions)
    .then(function ({ name, id, email, officeNumber }) {
      const manager = new Manager(name, id, email, officeNumber);
      employees.push(manager);
      console.log(employees);
      createTeam();
    });
}
init();

//function to create team and then ask appropriate questions based upon employee type//

function createTeam() {
  inquirer.prompt(teamQuestion)
    .then(function ({ job }) {
      if (job === "Engineer") {
        createEngineer();
      }
      else if (job === "Intern") {
        createIntern();
      }
      else if (job === "No more employees") {
        finishTeam();
      }
    })
};


function createEngineer() {
  inquirer.prompt(engineerQuestions).then(function ({ name, id, email, github }) {
      const engineer = new Engineer(name, id, email, github);

      employees.push(engineer);

      createTeam();
  })
}

function createIntern() {
  inquirer.prompt(internQuestions).then(function ({ name, id, email, school }) {
    const intern = new Intern(name, id, email, school);

    employees.push(intern);

    createTeam();
})

}
function finishTeam() {
  const htmlInfo = render(employees);

  fs.writeFile(outputPath, (htmlInfo), (err) => {
      if (err) throw err;
      console.log(" output/team.html to see your file!");

  })

}