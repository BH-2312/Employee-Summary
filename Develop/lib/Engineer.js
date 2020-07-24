const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(){
        this.github = github;
        super(name, id, email);
    }
    getGithub(){
        return this.github;
    };
    getRole(){
        return "Engineer"
    };
}