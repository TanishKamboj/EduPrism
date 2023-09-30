export default {
  messages: {
    error: {
      generic: (err : Error) => {
        return `An error has occurred ${err}.`;
      },
      notFound: "Resource not found.",
      unauthorized: "Unauthorized access.",
      validation: "Validation error.",
      conflict: "Resource already exists.",
      passwordConflict: "The new password cannot be same as you old password",
      unknown : "An unkown error occurred",
      invalidToken : "The token is invaild or expired"
    },
    success: {
      created: "Resource created successfully.",
      updated: "Resource updated successfully.",
      deleted: "Resource deleted successfully.",
      fetched: "Here is the resource data you wanted",
    },
  },
  status: {
    success: "Success",
    fail: "Failed",
  },
  userTypes:{
    Admin : 1,
    Learner : 2,
    Educator : 3,
    OrganizationHead :4 ,
    OrganizationEmployee : 5
  },
  course_role : {
    Admin : 0,
    LeadInstructor : 1,
    TA : 2,
    ContentCreator : 3 
  }
};