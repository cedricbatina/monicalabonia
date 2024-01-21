// validationRules.js
const nameRules = [(value) => !!value || "Name is required"];

const emailRules = [
  (value) => !!value || "E-mail is required",
  (value) => /^\S+@\S+\.\S+$/.test(value) || "E-mail must be valid",
];

const passwordRules = [];

export { nameRules, emailRules, passwordRules };
