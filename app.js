const express = require('express') //calls to import the "express" module.
const fs = require('fs') //requires fs module 
const app = express() //creates an object called app by calling the top-level express() function.
const PORT = process.env.PORT || 8080 //assigns the value of the environment variable PORT to the port variable. 
//If the environment variable PORT is not defined, it defaults to 8080. 

app.use(express.json());

const path = require('path'); 

// utility function - gets projects data
function getProjects() {
    const content = fs.readFileSync('web-project.json')
    return JSON.parse(content)
}

// When the user navigates to http://localhost:8080/api an array of ‘Web Project’ items should be returned.
// Defines a GET endpoint for getting all projects
app.get('/api', (req, res) => {
    const projects = getProjects(); // Gets projects data from file
    res.json(projects); // Sends the projects data as a JSON response
});


//The user should be able to use Postman to make an HTTP Post request 
//that adds an additional item to the list of Web Project items.
// Defines a POST endpoint for adding a project
app.post('/api', (req, res) => {
    const projects = getProjects(); // Gets projects data from file
    const newProject = {  // Creates a new project object with the data sent in the request
        id: projects.length + 1,
        title: req.body.projectTitle, // Sets the title to the value of the "title"  
        description: req.body.projectDescription, // Sets the description to the value of the "description" parameter 
        URL: req.body.projectUrl  // Sets the URL to the value of the "URL" 
    };
    projects.push(newProject); // Adds the new project object to the array of projects
    fs.writeFileSync('web-project.json', JSON.stringify(projects)) // Writes the updated projects data to file
    res.json(newProject) // Sends the new project data as a JSON response

});

//The user should be able to use Postman to make an HTTP Delete request 
//that deletes an item with a specific id from the list of Web Project items.
// Defines a DELETE endpoint for deleting a project
app.delete('/api', (req, res) => {
    const id = req.body.id; // Gets the id of the project to delete from the body
    const projects = getProjects(); // Gets projects data from file
    const index = projects.findIndex(element => element.id == id); // Finds the index of the project with the given ID
    let updatedProjects = [];

    if (index !== -1) { // If a project with the given ID was found
        projects.splice(index, 1) // Removes the project from the projects array
        projects.map((project, i) => {
            project.id = i + 1
            updatedProjects.push(project)
        })
        fs.writeFileSync('web-project.json', JSON.stringify(updatedProjects))// Writes the updated projects array to the 'web-project.json' file
        res.json('Success');  // Sends a success response
    } else { // If a project with the given ID was not found
        res.json('Project does not exist') // Sends an error response
    }
});

//The user should be able to make an HTTP Put request to update 
//the title or description of an item on the list of Web Project items using Postman.
// Defines a PUT endpoint for updating a project
app.put('/api', (req, res) => {
    const id = req.body.projectId; // Gets the id of the project to update from the body
    const title = req.body.projectTitle; // Gets the new title from the body
    const description = req.body.projectDescription; // Gets the new description from the body
    const url = req.body.projectUrl; // Gets the new URL from the body
    const projects = getProjects(); // Gets projects data from file
    const projectIndex = projects.findIndex(element => element.id == id); // Finds the index of the project with the given ID
    if (projectIndex !== -1) {  // If a project with the given ID was found
        projects[projectIndex].title = title; // Update the title of the project
        projects[projectIndex].description = description; // Update the description of the project
        projects[projectIndex].URL = url; // Update the URL of the project
        fs.writeFileSync('web-project.json', JSON.stringify(projects)) // Write the updated projects array to to the 'web-project.json' file
        res.send(projects[projectIndex]); // Sends the updated project 
    } else { // If a project with the given ID was not found
        res.json('Project does not exist') // Sends an error response
    }
});


// Serve the static files from the frontend build folder
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
// Catch all routes and serve the index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Starts the server on port 
app.listen(PORT, () => console.log('Listening engaged'))