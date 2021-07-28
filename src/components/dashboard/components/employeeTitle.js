// This function returns the title of the employee  based off the database integer.
// Using an integer will increase database response and reduce errors.
// Any additional Title created here we will have to create the option in the Django Backend.

const employeeTitle = (title) => {
  switch (title) {
    case 1:
      return "EMT";
    case 2:
      return "Paramedic";
    case 3:
      return "RN";
    case 4:
      return "Admin";
    case 5:
      return "Super User";
    default:
      return "NA";
  }
};

export default employeeTitle;
