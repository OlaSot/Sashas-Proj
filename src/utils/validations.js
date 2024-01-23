export const nameValidation = {
  required: "First name is required",
  maxLength: {
    value: 20,
    message: "You have limit up to 20 symbols in your name",
  },
  minLength: {
    value: 2,
    message: "You should have at least 2 symbols in your name",
  },
  pattern: {
    value: /^[a-z," "]+$/i,
    message: "Name can only consist of letters",
  },
};
export const phoneValidation = {
  required: "Phone is required",
  pattern: {
    value: /^[+].[0-9]/,
    message: "Phone number must start with + and contain only numbers",
  },
  minLength: {
    value: 11,
    message: "Phone number should have at least 11 digits",
  },
  maxLength: {
    value: 15,
    message: "Phone number should not exceed 15 digits",
  },
};
export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    message: "Invalid email",
  },
};
