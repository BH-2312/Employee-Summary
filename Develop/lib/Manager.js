const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee{
    constructor(officeNumber){
this.officeNumber = officeNumber;
super(name, id, email);
    }
    getRole(){
        return "Manager"
    };
}
module.exports = Manager;