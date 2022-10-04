export const initialCustomer = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
    properties: []
}

export const customerReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CUSTOMER":
      return action.agent
    default:
      return state;
  }
};