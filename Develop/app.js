const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

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

var employees = [];

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

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
  const htmlData = render(employees);

  fs.writeFile(outputPath, (htmlData), (err) => {
      if (err) throw err;
      console.log(" output/team.html to see your file!");

  })

}