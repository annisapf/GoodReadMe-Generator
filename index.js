const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
const pdf = require('html-pdf');


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
        default: 'README'
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
        default: 'GOODREADME'
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
        default: "*Good README.md Generator* is a CLI (Command-Line Interface) apps that dynamically generates a professional README.md from a user's input using the Axios, Inquirer and HTML-PDF package."
    },
    {
        type: "input",
        name: "userstory",
        message: "Please tell a user story",
        default: "AS A developer,I WANT a README generator, SO THAT can quickly create a professional README for a new project"
    },
    {
        type: "input",
        name: "demovideo",
        message: "Link to video",
        default: "![Demo Good ReadMe Generator](https://j.gifs.com/gZg79j.gif)"
    },
    {
        type: "input",
        name: "firstscreenshot",
        message: "Link to screenshot image",
        default: "https://user-images.githubusercontent.com/7066137/96330189-14382380-109f-11eb-87ff-4db08d0b7a51.png"
    },
    {
        type: "input",
        name: "secondscreenshot",
        message: "Link to another screenshot image",
        default: "https://user-images.githubusercontent.com/7066137/96330205-3631a600-109f-11eb-8c8d-f98821f2d3cd.png"
    },
    {
        type: "list",
        name: "license",
        message: "Please choose a licence below",
        choices: ["MIT", "ISC", "Apache", "IPL", "Unlicense"]
    },
    {
        type: "list",
        name: "color",
        message: "Please choose your favourite colour",
        choices: ["blue", "green", "magenta", "yellow", "grey"]
    },
    {
        type: "input",
        name: "iinstallation",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "htmlpdfinstallation",
        message: "What other command should be run to install dependencies?",
        default: "npm install html-pdf"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to run tests?",
        default: "There is no testing required"
    },
    {
        type: "input",
        name: "usage",
        message: "What command should be run to run tests?",
        default: "node index.js"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repository?",
        default: "It is an open project and everyone can contribute - please send and email requesting to be added as a contributor"
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

            let email = data.email;
            data["email"] = email;

            writeReadMeFile(data.fileName + ".md", generateReadMeFile(data))

            // HTML object for PDF template
            const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="description" content="Good ReadMe Generator" />
                <meta name="keywords" content="ReadMe Generator, HTML PDF Generator">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
            
                <title>GoodReadMe Generator</title>
            
            
                <!-- Bootstrap CSS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            
            </head>
            
            <body>
            
                <main>
            
                    <br><br><br>
            
                    <div class="container">
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 id="html-pdf" class="mt-0">${data.title}</h3>
                                <hr>
                                <br>
            
                            </div>
                        </div>
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 class="mt-0">Description</h3>
                                <hr>
                                <p>${data.description}</p>
            
                                <br>
            
                            </div>
                        </div>
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 class="mt-0">Table of Contents</h3>
                                <hr>
                                <p>
                                    <ul>

                                    <li> User Story </li>

                                    <li> Screenshots </li>

                                    <li> Installation </li>
            
                                    <li> Usage </li>
            
                                    <li> License </li>
            
                                    <li> Contributing </li>
            
                                    <li> Tests </li>
            
                                    <li> Questions
            
                                </p>
            
                                <br>
            
                            </div>
                        </div>


                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 id="userstory" class="mt-0">User Story</h3>
                                <hr>
                                <p>${data.userstory}</p>
            
                                <br>
            
                            </div>
                        </div>

                        <div class="row row-content align-items-center">
                        <div class="col-sm col-md flex-first">
        
                            <h3 class="mt-0">Screenshots</h3>
                            <hr>
                            <img src="${data.firstscreenshot}"/>
                            
        
                            <br>
        
                        </div>
                    </div>
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 class="mt-0">Installation</h3>
                                <hr>
                                <p>To install necessary dependencies, run the following command:</p>

                                <div class="p-3 mb-2 bg-light text-dark">${data.iinstallation}</div>
                                <div class="p-3 mb-2 bg-light text-dark">${data.htmlpdfinstallation}</div>
                            
                                <br>
            
                            </div>
                        </div>
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 class="mt-0">Usage</h3>
                                <hr>
                             
                                <div class="p-3 mb-2 bg-light text-dark">${data.usage}</div>
            
                                <br>
            
                            </div>
                        </div>
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 class="mt-0">Licence</h3>
                                <hr>
                                <p>${data.license}</p>
            
                                <br>
            
                            </div>
                        </div>
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 class="mt-0">Contributing</h3>
                                <hr>
                                <p>${data.contributing}</p>
            
                                <br>
            
                            </div>
                        </div>
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 class="mt-0">Test</h3>
                                <hr>
                                <p>${data.test}</p>
            
                                <br>
            
                            </div>
                        </div>
            
            
                        <div class="row row-content align-items-center">
                            <div class="col-sm col-md flex-first">
            
                                <h3 class="mt-0">Questions</h3>
                                <hr>
                                <p>If you have any questions about the repo, open an issue or contact <a href="https://github.com/${data.GitHub}/"></a> directly at 
                                <div class="p-3 mb-2 bg-info text-white">${data.email}</div></p>
            
                                <br>
            
                            </div>
                        </div>
            
                    </div>
                </main>
            
            </body>
            
            </html>
            `
            // Set paper size to PDF file
            var options = { format: 'A2' };

            // This function to generate from HTML format to PDF document
            pdf.create(htmlContent, options).toFile('./README.pdf', function (err, res) {
                if (err) return console.log(err);
                console.log(res);
            })


        })

    });
}


init();


function getBadge(licence, color) {
    if (licence !== 'None') {
        return `[![Licence : ${licence}](https://img.shields.io/badge/Licence-${licence}-${color}.svg)](https://opensource.org/licences/${licence})`
    } else if (licence === 'Apache') {
        return `[![Licence : ${licence}](https://img.shields.io/badge/Licence-${licence}-%202.0-${color}.svg)](https://opensource.org/licences/${licence}-2.0)`
    } else if (licence === 'IPL') {
        return `[![Licence : ${licence}](https://img.shields.io/badge/Licence-${licence}-${color}.svg)](https://opensource.org/licences/${licence}-1.0)`
    } else if (licence === 'Unlicence') {
        return `[![License: Unlicense](https://img.shields.io/badge/license-${licence}-${color}.svg)](http://unlicense.org/)`
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
${getBadge(data.license, data.color)}
    
## Description
    
${data.description}

    
## Table of Contents 

* [User Story](#userstory)

* [Demo Video](#demovideo)

* [Screen Shots](#screenshots)
    
* [Installation](#installation)
    
* [Usage](#usage)
    
* [License](#license)
    
* [Contributing](#contributing)
    
* [Tests](#tests)
    
* [Questions](#questions)

## User Story
    
${data.userstory}

## Demo Video
    
${data.demovideo}

## Screenshots

![Screen Shot 2020-10-16 at 16 38 34](${data.firstscreenshot})
![Screen Shot 2020-10-16 at 16 35 41](${data.secondscreenshot})
    
   
## Installation
    
This project uses 2 npm packages: 
* [axios](https://www.npmjs.com/package/axios)
* [inquirer](https://www.npmjs.com/package/inquirer)
To install necessary dependencies, run the following command:
    
\`\`\`
${data.iinstallation}
\`\`\`

\`\`\`
${data.htmlpdfinstallation}
\`\`\`
    
## Usage
    
To run tests, run the following command:
    
\`\`\`
${data.usage}
\`\`\`


    
${getLicense(data.license)}
        
## Contributing
    
${data.contributing}

    
## Tests
    
${data.test}


    
## Questions
    
If you have any questions about the repo, open an issue or contact [${data.GitHub}](https://github.com/${data.GitHub}/) directly at ${data.email}.`;
}

