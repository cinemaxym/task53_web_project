import React from "react"; //imports React
import Button from 'react-bootstrap/Button'; //Imports Button component 
import Form from 'react-bootstrap/Form'; //Imports Form component 
import '../style/infoStyle.css' //imports styles


class Info extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state with empty projects array, and input fields for project data
        this.state = {
            projects: [], 
            inputProjectId: "",
            inputProjectTitle: "",
            inputProjectDescription: "",
            inputProjectUrl: "",
            response: ""
        }
        // Bind "this" to the class methods, so they can access state and props

        this.displayProjects = this.displayProjects.bind(this)
        this.addProject = this.addProject.bind(this)
        this.addProjectInfo = this.addProjectInfo.bind(this)
        this.deleteProject = this.deleteProject.bind(this)
        this.editProject = this.editProject.bind(this)
    }

    // After the component mounts, display the projects from the server
    componentDidMount() {
        this.displayProjects()
    }
    
    // Send a GET request to the server to retrieve the projects, and update state
    displayProjects() {
        fetch('/api')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ projects: data });
            }, (err) => {
                console.log(err)
            });
        // Reset the input fields
        this.setState({
            inputProjectId: "",
            inputProjectTitle: "",
            inputProjectDescription: "",
            inputProjectUrl: "",
        })
    }

    // Send a POST request to the server to add a new project
    addProject() {
        let project = {
            projectTitle: this.state.inputProjectTitle,
            projectDescription: this.state.inputProjectDescription,
            projectUrl: this.state.inputProjectUrl
        }
        fetch('/api', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }, (err) => {
                console.log(err)
            });

        // After adding the project, refresh the displayed projects
        this.displayProjects()
    }


    // Event hahdler updates the appropriate input field in state as the user types
    addProjectInfo(e) {
        const input = e.target.id
        if (input === "input1") {
            this.setState({
                inputProjectId: e.target.value

            })
        } else if (input === "input2") {
            this.setState({
                inputProjectTitle: e.target.value

            })
        } else if (input === "input3") {
            this.setState({
                inputProjectDescription: e.target.value
            })
        } else {
            this.setState({
                inputProjectUrl: e.target.value
            })
        }
    }

    // Send a DELETE request to the server to delete a project
    deleteProject(e) {
        let id = e.target.id
        fetch('/api', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }, (err) => {
                console.log(err)
            });

        // After deleting the project, refresh the displayed projects
        this.displayProjects()
    }

    // Send a PUT request to the server to edit a project
    editProject() {
        let project = {
            projectId: this.state.inputProjectId,
            projectTitle: this.state.inputProjectTitle,
            projectDescription: this.state.inputProjectDescription,
            projectUrl: this.state.inputProjectUrl
        }
        fetch('/api', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ response: data });
                console.log(data);
            }, (err) => {
                console.log(err)
            });
        this.displayProjects()
    }

    // Renders the component with a list of web projects and a form to add or edit a project.
    render() {
        return (
            <div >
                <h1>Web Projects</h1>
                {/* maps list of projects */}
                {this.state.projects.map((project) => (   
                    <div className="project-container" key={project.id}>
                        <p> <b>Project ID:</b>  {project.id}</p>
                        <p> <b>Project Title:</b>  {project.title}</p>
                        <p> <b>Project description:</b>  {project.description}</p>
                        <p> <b>Project URL:</b>  {project.URL}</p>
                        {/* Button to delete a project */}
                        <Button variant="outline-danger" className="btn" type="button" size="sm" id={project.id} onClick={this.deleteProject}>Delete Project</Button>

                    </div>
                ))}
                <div className="form-container">
                    <h4>Add Project / Edit Project</h4>
                    {/* Text input for project ID */}
                    <Form.Control type="number" id="input1" placeholder="Enter project id" value={this.state.inputProjectId} onChange={this.addProjectInfo} /><br /> 
                    {/* Text input for project title */}
                    <Form.Control type="text" id="input2" placeholder="Enter project title" value={this.state.inputProjectTitle} onChange={this.addProjectInfo} /><br />
                    {/* Text input for project description */}
                    <Form.Control type="text" id="input3" placeholder="Enter project description" value={this.state.inputProjectDescription} onChange={this.addProjectInfo} /><br />
                    {/* Text input for project URL */}
                    <Form.Control type="text" id="input4" placeholder="Enter project URL" value={this.state.inputProjectUrl} onChange={this.addProjectInfo} /><br />
                    <br />
                    {/* Button to add a new project */}
                    <Button variant="outline-primary" className="btn" type="button" onClick={this.addProject}>Add Project</Button>{' '}
                    {/* Button to edit an existing project */}
                    <Button variant="outline-primary" className="btn" type="button" onClick={this.editProject}>Edit Project</Button>
                    <br />
                </div>
            </div>
        )
    }
}

export default Info;