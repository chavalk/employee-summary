const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: 'list',
        message: 'What is the role of the employee?',
        choices: ['manager', 'engineer', 'intern'],
        name: 'role',
    },
    {
        type: 'input',
        message: 'What is the name of the employee?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is the ID of the employee?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is the email of the employee?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is the office number of the manager?',
        name: 'office',
        when: (answer) => answer.role === 'manager',
    },
    {
        type: 'input',
        message: 'What is the GitHub username for the engineer?',
        name: 'github',
        when: (answer) => answer.role === 'engineer',
    },
    {
        type: 'input',
        message: 'What is the school of the intern?',
        name: 'school',
        when: (answer) => answer.role === 'intern',
    },
    {
        type: 'list',
        message: 'Would you like to add another employee?',
        choices: ['Yes', 'No'],
        name: 'add',
    },
]

function askQuestions() {
    inquirer.prompt(questions).then(res => {

        if (res.role === 'manager') {
            const manager = new Manager(res.name, res.id, res.email, res.office);
            team.push(manager);
        } else if (res.role === 'engineer') {
            const engineer = new Engineer(res.name, res.id, res.email, res.github);
            team.push(engineer);
        } else {
            const intern = new Intern(res.name, res.id, res.email, res.school);
            team.push(intern);
        }

        if (res.add === "Yes") {
            askQuestions();
        }else {
            buildPage();
        }
    })
}

askQuestions();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function buildPage() {

    const html = render(team);

    fs.writeFile(outputPath, html, (err) => 
        err ? console.error(err) : console.log('Success!')
    );
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
