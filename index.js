const fs = require('fs');
const axios = require('axios');
const path = require('path');
const util = require('util');
const inquirer = require('inquirer');


const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const input = [
    {
        type: "input",
        name: "GitHub",
        message: "Please type your GitHub username",
        default: 'annisapf'
    },
    {
        type: "input",
        name: "fileName",
        message: "Please provide the name for a .md file",
        default: 'GOODREADME'
    },
    {
        type: "input",
        name: "email",
        message: "Please type your email",
        default: "a.purbandari@gmail.com",
        validate: validateEmail
    },
    {
        type: "input",
        name: "URL",
        message: "Please type the URL to your project",
        default: 'GoodReadMe'
    },
    {
        type: "input",
        name: "title",
        message: "Please type your project's name",
        default: "GoodREADME.md generator"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a short description of your project",
        default: 'this is an app I developed so I can automate read me file development'
    },
    {
        type: "list",
        name: "license",
        message: "Please choose a licence below",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    {
        type: "list",
        name: "color",
        message: "Please choose your favourite colour",
        choices: ["red", "green", "purple", "black", "magenta"]
    },
    {
        type: "input",
        name: "installation",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to run tests?",
        default: "npm test"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repository?",
        default: "It is an open project and everyone can contribute - please send and email requesting to be added as a contributor!"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repository?",
        default: 'this is an open source app - anyone can contribute'
    }
]

function writeReadMeFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            throw err;
        }
    })
}

async function init() {
    inquirer.prompt(input).then(function (data) {
        console.log(data);
        let url = "https://api.github.com/users/" + data.Username + "/events/public"

        axios.get(url).then(function (response) {

            let email = response.data.email;
            data["email"] = email;

            writeReadMeFile(data.fileName + ".md", generateReadMeFile(data))

        })

    });
}


init();

function getGitHubLink(GitHub, link) {
    return `http://github.com/${GitHub}/${link}`;
}

function getBadge(licence, GitHub, title, color, link) {
    if (licence !== 'None') {
        return `[![GitHub licence](https://img.shields.io/badge/-${color}.svg)](${getGitHubLink(GitHub, title, link)})`
    } else {
        return ``
    }
}

function getLicense(license) {
    if (license !== 'None') {
        return `
## License
    License is ${license} standard license.`
    } else {
        return ``
    }
}


function generateReadMeFile(data) {
    return `
# ${data.title}
${getBadge(data.license, data.GitHub, data.title, data.color, data.URL)}
    
## Description
    
${data.description}
    
## Table of Contents 
    
* [Installation](#installation)
    
* [Usage](#usage)
    
* [License](#license)
    
* [Contributing](#contributing)
    
* [Tests](#tests)
    
* [Questions](#questions)
    
## Installation
    
To install necessary dependencies, run the following command:
    
\`\`\`
${data.installation}
\`\`\`
    
## Usage
    
${data.usage}

    
${getLicense(data.license)}
        
## Contributing
    
${data.contributing}
    
## Tests
    
To run tests, run the following command:
    
\`\`\`
${data.test}
\`\`\`

    
## Questions
    
If you have any questions about the repo, open an issue or contact [${data.GitHub}](https://github.com/annisapf/) directly at ${data.email}.`;
}

function generatePDFFile(data) {
    return `
    "This is Project Title: ", ${data.title}
    ${getBadge(data.license, data.GitHub, data.title, data.color, data.URL)}
  `
}
